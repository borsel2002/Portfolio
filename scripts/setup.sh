#!/bin/bash

# Personal Portfolio Setup Script
echo "🚀 Setting up Personal Portfolio Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp env.example .env.local
    echo "✅ Environment file created. Please update .env.local with your configuration."
fi

# Set up database
echo "🗄️ Setting up database..."
npx prisma db push
npx prisma db seed

echo "✅ Database setup complete"

# Build the application
echo "🔨 Building application..."
npm run build

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000 to see your portfolio"
echo "4. Visit http://localhost:3000/admin to access admin panel"
echo "5. Default admin credentials: admin@portfolio.com / admin123"
echo ""
echo "For Docker deployment, run: docker-compose up -d"
