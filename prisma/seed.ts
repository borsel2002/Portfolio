import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create default profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with expertise in modern web technologies. I love creating beautiful, functional applications that make a difference.',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'Your City, Country',
      website: 'https://yourwebsite.com',
      linkedin: 'https://linkedin.com/in/yourprofile',
      github: 'https://github.com/yourusername',
      twitter: 'https://twitter.com/yourusername',
    },
  })

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with modern UI and secure payments',
      content: 'Built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, shopping cart, and order processing.',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true,
      order: 1,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      content: 'A responsive web application built with React and Node.js. Includes drag-and-drop functionality, team collaboration features, and progress tracking.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
      githubUrl: 'https://github.com/yourusername/task-manager',
      liveUrl: 'https://taskmanager-demo.com',
      featured: true,
      order: 2,
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather information with beautiful visualizations',
      content: 'A responsive weather dashboard that displays current conditions and forecasts. Built with modern web technologies and integrated with weather APIs.',
      technologies: ['Vue.js', 'Chart.js', 'Weather API', 'CSS3', 'JavaScript'],
      githubUrl: 'https://github.com/yourusername/weather-dashboard',
      liveUrl: 'https://weather-demo.com',
      featured: false,
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
  }

  // Create sample experience
  const experiences = [
    {
      company: 'Tech Company Inc.',
      position: 'Senior Full Stack Developer',
      description: 'Led development of multiple web applications and mentored junior developers. Implemented modern development practices and improved team productivity.',
      startDate: '2022-01',
      endDate: '2024-01',
      current: false,
      location: 'San Francisco, CA',
      order: 1,
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      description: 'Developed responsive web applications using React and modern JavaScript. Collaborated with design team to create intuitive user interfaces.',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      location: 'Remote',
      order: 2,
    },
  ]

  for (const experience of experiences) {
    await prisma.experience.create({
      data: experience,
    })
  }

  // Create sample education
  const educations = [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
      location: 'Boston, MA',
      gpa: '3.8/4.0',
      order: 1,
    },
  ]

  for (const education of educations) {
    await prisma.education.create({
      data: education,
    })
  }

  // Create sample skills
  const skills = [
    { name: 'JavaScript', category: 'Programming Languages', level: 9, order: 1 },
    { name: 'TypeScript', category: 'Programming Languages', level: 8, order: 2 },
    { name: 'React', category: 'Frontend', level: 9, order: 3 },
    { name: 'Next.js', category: 'Frontend', level: 8, order: 4 },
    { name: 'Node.js', category: 'Backend', level: 8, order: 5 },
    { name: 'Python', category: 'Programming Languages', level: 7, order: 6 },
    { name: 'PostgreSQL', category: 'Database', level: 8, order: 7 },
    { name: 'MongoDB', category: 'Database', level: 7, order: 8 },
    { name: 'Docker', category: 'DevOps', level: 6, order: 9 },
    { name: 'AWS', category: 'Cloud', level: 6, order: 10 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    })
  }

  console.log('Database seeded successfully!')
  console.log('Admin user created: admin@portfolio.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
