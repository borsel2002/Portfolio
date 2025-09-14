#!/bin/bash

# AWS Deployment Script for Personal Portfolio
set -e

# Configuration
AWS_REGION="us-east-1"
ECR_REPOSITORY="portfolio"
ECS_CLUSTER="portfolio-cluster"
ECS_SERVICE="portfolio-service"
TASK_DEFINITION="portfolio-task"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting AWS deployment for Personal Portfolio${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${YELLOW}📋 AWS Account ID: ${AWS_ACCOUNT_ID}${NC}"

# Create ECR repository if it doesn't exist
echo -e "${YELLOW}📦 Creating ECR repository...${NC}"
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION 2>/dev/null || \
aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION

# Login to ECR
echo -e "${YELLOW}🔐 Logging in to ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and tag Docker image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
docker build -t $ECR_REPOSITORY:latest .

# Tag image for ECR
docker tag $ECR_REPOSITORY:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Push image to ECR
echo -e "${YELLOW}📤 Pushing image to ECR...${NC}"
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Update ECS service
echo -e "${YELLOW}🔄 Updating ECS service...${NC}"
aws ecs update-service \
    --cluster $ECS_CLUSTER \
    --service $ECS_SERVICE \
    --force-new-deployment \
    --region $AWS_REGION

# Wait for deployment to complete
echo -e "${YELLOW}⏳ Waiting for deployment to complete...${NC}"
aws ecs wait services-stable \
    --cluster $ECS_CLUSTER \
    --services $ECS_SERVICE \
    --region $AWS_REGION

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"

# Get service URL
echo -e "${YELLOW}🌐 Getting service URL...${NC}"
ALB_DNS=$(aws cloudformation describe-stacks \
    --stack-name portfolio-stack \
    --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' \
    --output text \
    --region $AWS_REGION 2>/dev/null || echo "Not available")

if [ "$ALB_DNS" != "Not available" ]; then
    echo -e "${GREEN}🎉 Your portfolio is available at: http://$ALB_DNS${NC}"
else
    echo -e "${YELLOW}⚠️  Could not retrieve service URL. Check your CloudFormation stack.${NC}"
fi

echo -e "${GREEN}🎊 Deployment process completed!${NC}"
