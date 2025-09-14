'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { formatDateRange } from '@/lib/utils'

interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
  avatar?: string
  resume?: string
}

interface Project {
  id: string
  title: string
  description: string
  content?: string
  image?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order: number
}

interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  category: string
  level: number
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, experienceRes, educationRes, skillsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/projects'),
          fetch('/api/experience'),
          fetch('/api/education'),
          fetch('/api/skills'),
        ])

        const [profileData, projectsData, experienceData, educationData, skillsData] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          experienceRes.json(),
          educationRes.json(),
          skillsRes.json(),
        ])

        setProfile(profileData)
        setProjects(projectsData.filter((p: Project) => p.featured).slice(0, 3))
        setExperience(experienceData.slice(0, 3))
        setEducation(educationData.slice(0, 2))
        setSkills(skillsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600">Please set up your profile in the admin panel.</p>
        </div>
      </div>
    )
  }

  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="#projects" className="text-gray-600 hover:text-gray-900">
                Projects
              </Link>
              <Link href="#experience" className="text-gray-600 hover:text-gray-900">
                Experience
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/admin" className="text-primary hover:text-primary/80">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {profile.title}
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              {profile.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
              {profile.resume && (
                <Button size="lg" variant="outline" asChild>
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5 mr-2" />
                    Download Resume
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {profile.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Development</h3>
                <p className="text-gray-600">Full-stack development with modern technologies</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <p className="text-gray-600">{experience.length}+ years of professional experience</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-600">Strong educational background in computer science</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Passion</h3>
                <p className="text-gray-600">Passionate about creating innovative solutions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-xl">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-600">{skill.level}/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(skill.level / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              Some of my recent work and side projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <p className="text-lg text-gray-600">
              My professional journey
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp) => (
              <Card key={exp.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-lg text-primary font-medium">{exp.company}</p>
                      <p className="text-gray-600">
                        {formatDateRange(exp.startDate, exp.endDate)} • {exp.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Let's work together on your next project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <a href={`mailto:${profile.email}`} className="text-gray-700 hover:text-primary">
                    {profile.email}
                  </a>
                </div>
                {profile.phone && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <a href={`tel:${profile.phone}`} className="text-gray-700 hover:text-primary">
                      {profile.phone}
                    </a>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {profile.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {profile.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {profile.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 {profile.name}. All rights reserved.</p>
            <p className="mt-2 text-gray-400">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
