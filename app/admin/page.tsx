'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  MessageSquare,
  Eye,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DashboardStats {
  projects: number
  experience: number
  education: number
  skills: number
  messages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
    messages: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, experienceRes, educationRes, skillsRes, messagesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/experience'),
          fetch('/api/education'),
          fetch('/api/skills'),
          fetch('/api/contact'),
        ])

        const [projects, experience, education, skills, messages] = await Promise.all([
          projectsRes.json(),
          experienceRes.json(),
          educationRes.json(),
          skillsRes.json(),
          messagesRes.json(),
        ])

        setStats({
          projects: projects.length,
          experience: experience.length,
          education: education.length,
          skills: skills.length,
          messages: messages.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Projects',
      value: stats.projects,
      description: 'Portfolio projects',
      icon: Briefcase,
      href: '/admin/projects',
    },
    {
      title: 'Experience',
      value: stats.experience,
      description: 'Work experience entries',
      icon: Briefcase,
      href: '/admin/experience',
    },
    {
      title: 'Education',
      value: stats.education,
      description: 'Education entries',
      icon: GraduationCap,
      href: '/admin/education',
    },
    {
      title: 'Skills',
      value: stats.skills,
      description: 'Technical skills',
      icon: Code,
      href: '/admin/skills',
    },
    {
      title: 'Messages',
      value: stats.messages,
      description: 'Contact messages',
      icon: MessageSquare,
      href: '/admin/messages',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your portfolio admin panel</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              View Site
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/profile">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto" asChild>
                  <Link href={stat.href}>
                    Manage <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/profile">
                <User className="h-4 w-4 mr-2" />
                Update Profile Information
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects">
                <Briefcase className="h-4 w-4 mr-2" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/experience">
                <Briefcase className="h-4 w-4 mr-2" />
                Add Work Experience
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/skills">
                <Code className="h-4 w-4 mr-2" />
                Manage Skills
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              <p>No recent activity to display.</p>
              <p className="mt-2">Start by updating your profile or adding projects!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
