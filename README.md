# Personal Portfolio Website

A modern, full-stack personal portfolio website with an admin panel for easy content management. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, responsive design with Tailwind CSS
- 🔐 **Admin Panel**: Secure admin interface for managing all content
- 📱 **Responsive**: Works perfectly on all devices
- 🚀 **Easy Deployment**: Docker support for simple deployment
- 📊 **Content Management**: Manage projects, experience, education, skills, and more
- 💬 **Contact Form**: Built-in contact form for visitors
- 🔍 **SEO Ready**: Optimized for search engines

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (easily configurable for PostgreSQL/MySQL)
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Lucide React
- **Deployment**: Docker, Docker Compose

## Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose (for containerized deployment)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ADMIN_EMAIL="admin@portfolio.com"
   ADMIN_PASSWORD="admin123"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Default admin credentials: admin@portfolio.com / admin123

### Docker Deployment

1. **Clone and navigate to the project**
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Create environment file**
   ```bash
   cp env.example .env
   ```
   
   Update the environment variables in `.env`:
   ```env
   DATABASE_URL=file:./data/portfolio.db
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-this-in-production
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Admin Panel

The admin panel provides a comprehensive interface for managing your portfolio content:

### Dashboard
- Overview of all content statistics
- Quick access to common tasks
- Recent activity monitoring

### Profile Management
- Personal information (name, title, bio)
- Contact details (email, phone, location)
- Social media links (GitHub, LinkedIn, Twitter, etc.)
- Resume upload

### Content Management
- **Projects**: Add, edit, and organize portfolio projects
- **Experience**: Manage work experience entries
- **Education**: Add educational background
- **Skills**: Organize technical skills by category
- **Messages**: View and manage contact form submissions

## Customization

### Styling
The website uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme configuration
- Updating `app/globals.css` for global styles
- Customizing component styles in the `components` directory

### Content
All content is managed through the admin panel. The default seed data provides examples for each content type.

### Database
The application uses Prisma ORM with SQLite by default. To use a different database:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql" // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update your `.env` file with the new database URL

3. Run migrations:
   ```bash
   npx prisma db push
   ```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
Use the provided `Dockerfile` and `docker-compose.yml` for containerized deployment on any VPS or cloud provider.

### Traditional VPS
1. Set up Node.js environment on your server
2. Clone the repository
3. Install dependencies and build the application
4. Use PM2 or similar process manager for production

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `NEXTAUTH_URL` | Base URL for authentication | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | Required |
| `ADMIN_EMAIL` | Admin user email | `admin@portfolio.com` |
| `ADMIN_PASSWORD` | Admin user password | `admin123` |

## Security Considerations

- Change default admin credentials in production
- Use a strong `NEXTAUTH_SECRET`
- Enable HTTPS in production
- Regularly update dependencies
- Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the admin panel help sections

## Roadmap

- [ ] Blog functionality
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Theme customization
- [ ] API documentation
- [ ] Mobile app

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
