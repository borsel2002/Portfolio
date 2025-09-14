# AWS Deployment Guide

This guide will help you deploy your personal portfolio website to AWS using modern cloud services.

## 🏗️ Architecture Overview

Your portfolio will be deployed using:
- **ECS Fargate** - Containerized application hosting
- **RDS PostgreSQL** - Managed database
- **Application Load Balancer** - Traffic distribution
- **S3** - Static asset storage
- **CloudFront** - CDN for global performance
- **Secrets Manager** - Secure credential storage

## 📋 Prerequisites

### Required Tools
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [Docker](https://www.docker.com/) installed and running
- [Node.js 18+](https://nodejs.org/) for local development
- Git for version control

### AWS Account Setup
1. Create an AWS account
2. Set up IAM user with appropriate permissions
3. Configure AWS CLI: `aws configure`

## 🚀 Quick Deployment

### Option 1: One-Click Deployment (Recommended)

1. **Deploy Infrastructure**
   ```bash
   # Deploy CloudFormation stack
   aws cloudformation create-stack \
     --stack-name portfolio-stack \
     --template-body file://aws/cloudformation-template.yaml \
     --parameters ParameterKey=DatabasePassword,ParameterValue=YourSecurePassword123! \
     --capabilities CAPABILITY_IAM
   ```

2. **Deploy Application**
   ```bash
   # Run deployment script
   ./scripts/deploy-aws.sh
   ```

### Option 2: Manual Step-by-Step

#### Step 1: Deploy Infrastructure

1. **Create VPC and Networking**
   ```bash
   aws cloudformation create-stack \
     --stack-name portfolio-infrastructure \
     --template-body file://aws/cloudformation-template.yaml \
     --parameters ParameterKey=DatabasePassword,ParameterValue=YourSecurePassword123! \
     --capabilities CAPABILITY_IAM
   ```

2. **Wait for Stack Creation**
   ```bash
   aws cloudformation wait stack-create-complete \
     --stack-name portfolio-infrastructure
   ```

#### Step 2: Set Up Database

1. **Connect to RDS Database**
   ```bash
   # Get database endpoint
   DB_ENDPOINT=$(aws cloudformation describe-stacks \
     --stack-name portfolio-infrastructure \
     --query 'Stacks[0].Outputs[?OutputKey==`DatabaseEndpoint`].OutputValue' \
     --output text)
   
   # Run database migrations
   DATABASE_URL="postgresql://portfolio_user:YourSecurePassword123!@$DB_ENDPOINT:5432/portfolio?schema=public"
   npx prisma db push
   npx prisma db seed
   ```

#### Step 3: Deploy Application

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name portfolio --region us-east-1
   ```

2. **Build and Push Docker Image**
   ```bash
   # Get AWS Account ID
   AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
   
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin \
     $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
   
   # Build and push image
   docker build -t portfolio .
   docker tag portfolio:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
   docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
   ```

3. **Create ECS Cluster and Service**
   ```bash
   # Create cluster
   aws ecs create-cluster --cluster-name portfolio-cluster
   
   # Register task definition
   aws ecs register-task-definition \
     --cli-input-json file://aws/ecs-task-definition.json
   
   # Create service
   aws ecs create-service \
     --cluster portfolio-cluster \
     --service-name portfolio-service \
     --task-definition portfolio-task \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
   ```

## 🔧 Configuration

### Environment Variables

Set these in your ECS task definition or use AWS Secrets Manager:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
DIRECT_URL="postgresql://username:password@host:port/database?schema=public"

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# AWS Configuration
AWS_REGION="us-east-1"
S3_BUCKET_NAME="your-portfolio-bucket"
```

### Custom Domain Setup

1. **Purchase Domain** (Route 53 or external)
2. **Create SSL Certificate** in AWS Certificate Manager
3. **Update CloudFormation** with your domain
4. **Configure DNS** to point to your load balancer

## 📊 Monitoring and Logs

### CloudWatch Logs
- Application logs: `/ecs/portfolio`
- Database logs: Available in RDS console

### Health Checks
- Application: `http://your-domain.com/api/health`
- Database: Monitored by RDS

### Performance Monitoring
- Use AWS X-Ray for distributed tracing
- CloudWatch metrics for performance insights

## 💰 Cost Optimization

### Development Environment
- Use `t3.micro` instances
- Single AZ deployment
- Minimal storage

### Production Environment
- Use `t3.small` or larger
- Multi-AZ for high availability
- Reserved instances for cost savings

## 🔒 Security Best Practices

1. **Network Security**
   - Use private subnets for database
   - Security groups with minimal access
   - VPC endpoints for AWS services

2. **Data Security**
   - Enable encryption at rest
   - Use AWS Secrets Manager
   - Regular security updates

3. **Access Control**
   - IAM roles with least privilege
   - MFA for admin access
   - Regular access reviews

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check security group rules
   - Verify database endpoint
   - Check credentials in Secrets Manager

2. **Application Won't Start**
   - Check CloudWatch logs
   - Verify environment variables
   - Check task definition

3. **Load Balancer Health Check Failed**
   - Verify health check endpoint
   - Check security group rules
   - Ensure application is running

### Debug Commands

```bash
# Check ECS service status
aws ecs describe-services --cluster portfolio-cluster --services portfolio-service

# View application logs
aws logs tail /ecs/portfolio --follow

# Check database connectivity
aws rds describe-db-instances --db-instance-identifier portfolio-database
```

## 📈 Scaling

### Horizontal Scaling
- Increase desired count in ECS service
- Use Application Auto Scaling
- Load balancer distributes traffic

### Vertical Scaling
- Update task definition with more CPU/memory
- Redeploy service with new task definition

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to AWS
        run: ./scripts/deploy-aws.sh
```

## 📞 Support

For issues with this deployment:
1. Check AWS CloudWatch logs
2. Review this documentation
3. Check AWS service status
4. Contact AWS support if needed

## 🎉 Success!

Once deployed, your portfolio will be available at your load balancer DNS name or custom domain. The admin panel will be accessible at `/admin` for content management.

---

**Estimated Monthly Cost**: $50-100 (depending on usage and region)
**Deployment Time**: 15-30 minutes
**Maintenance**: Minimal with managed services
