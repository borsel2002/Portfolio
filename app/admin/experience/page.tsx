'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react'

interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
  order: number
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<Experience>()
  const isCurrent = watch('current')

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experience')
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      toast.error('Failed to fetch experiences')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: Experience) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const newExperience = await response.json()
        setExperiences([...experiences, newExperience])
        toast.success('Experience added successfully')
        reset()
        setShowForm(false)
      } else {
        toast.error('Failed to add experience')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    reset(experience)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setExperiences(experiences.filter(e => e.id !== id))
        toast.success('Experience deleted successfully')
      } else {
        toast.error('Failed to delete experience')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleCancel = () => {
    setEditingExperience(null)
    setShowForm(false)
    reset()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Experience</h1>
          <p className="text-gray-600">Manage your professional experience</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingExperience ? 'Edit Experience' : 'Add New Experience'}
            </CardTitle>
            <CardDescription>
              {editingExperience ? 'Update experience information' : 'Add a new work experience entry'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    {...register('company', { required: 'Company is required' })}
                    placeholder="Company Name"
                  />
                  {errors.company && (
                    <p className="text-sm text-red-600">{errors.company.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    {...register('position', { required: 'Position is required' })}
                    placeholder="Job Title"
                  />
                  {errors.position && (
                    <p className="text-sm text-red-600">{errors.position.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  placeholder="Describe your role and achievements..."
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="month"
                    {...register('startDate', { required: 'Start date is required' })}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600">{errors.startDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    {...register('endDate')}
                    disabled={isCurrent}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="current"
                  {...register('current')}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="current">Currently working here</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingExperience ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{experience.position}</h3>
                  </div>
                  <p className="text-lg text-primary font-medium mb-2">{experience.company}</p>
                  <p className="text-gray-600 mb-2">
                    {new Date(experience.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })} - {experience.current ? 'Present' : 
                      new Date(experience.endDate!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })
                    }
                    {experience.location && ` • ${experience.location}`}
                  </p>
                  <p className="text-gray-700">{experience.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(experience.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No experience entries yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
