# Quick Start Guide

Get your personal portfolio website up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### Option 1: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp env.example .env.local
   ```

3. **Initialize database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access your portfolio**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Default admin: admin@portfolio.com / admin123

### Option 2: Docker (Recommended for Production)

1. **Create environment file**
   ```bash
   cp env.example .env
   ```

2. **Start with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Access your portfolio**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🎨 Customize Your Portfolio

1. **Login to Admin Panel**
   - Go to http://localhost:3000/admin
   - Use admin@portfolio.com / admin123

2. **Update Your Profile**
   - Click "Profile" in the sidebar
   - Update your name, title, bio, and contact info
   - Add your social media links

3. **Add Your Projects**
   - Click "Projects" in the sidebar
   - Add your portfolio projects
   - Include technologies, GitHub links, and live demos

4. **Add Work Experience**
   - Click "Experience" in the sidebar
   - Add your professional experience
   - Include company, position, and achievements

5. **Add Education & Skills**
   - Click "Education" and "Skills" in the sidebar
   - Add your educational background
   - Organize your technical skills

## 🔧 Configuration

### Environment Variables

Update `.env.local` (development) or `.env` (production):

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin (change these!)
ADMIN_EMAIL="admin@portfolio.com"
ADMIN_PASSWORD="admin123"
```

### Customization

- **Styling**: Edit `tailwind.config.js` and `app/globals.css`
- **Content**: Use the admin panel to manage all content
- **Database**: Change provider in `prisma/schema.prisma` for PostgreSQL/MySQL

## 📱 Features

✅ **Responsive Design** - Works on all devices  
✅ **Admin Panel** - Easy content management  
✅ **Contact Form** - Built-in contact functionality  
✅ **SEO Ready** - Optimized for search engines  
✅ **Modern UI** - Clean, professional design  
✅ **Docker Support** - Easy deployment  
✅ **TypeScript** - Type-safe development  

## 🚀 Deployment

### Vercel (Easiest)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

### Docker
1. Build image: `docker build -t portfolio .`
2. Run: `docker run -p 3000:3000 portfolio`

### VPS
1. Upload files to server
2. Install Node.js and dependencies
3. Set up environment variables
4. Run with PM2: `pm2 start npm --name "portfolio" -- start`

## 🆘 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Review the admin panel help sections
- Check the GitHub issues for common problems

## 🎉 You're Ready!

Your portfolio is now live and ready to impress potential employers. Update the content through the admin panel and start sharing your work!

---

**Next Steps:**
1. Customize your profile information
2. Add your projects and experience
3. Update the styling to match your brand
4. Deploy to your preferred platform
5. Share your portfolio with the world!
