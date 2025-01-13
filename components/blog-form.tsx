'use client'

import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { imageToBase64 } from "@/lib/imageToBase64"
import { useCreatePostBlog } from "@/features/api/use-create-blog"

type BlogPost = {
  title: string
  subtitle: string
  content: string
  coverImage: string
  slug: string
  authorName: string
  authorRole: string
  authorAvatar: string
}

const generateSlug = (title: string): string => {
  const randomString = Math.random().toString(36).substring(2, 8)
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${randomString}`
}

const BlogPostForm = () => {
  const mutate = useCreatePostBlog();

  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    subtitle: '',
    content: '',
    coverImage: '',
    slug: '',
    authorName: '',
    authorRole: '',
    authorAvatar: ''
  })

  const [errors, setErrors] = useState<Partial<BlogPost>>({})

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      ...(name === 'title' ? { slug: generateSlug(value) } : {})
    }))
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
  }

  const handleImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      try {
        const base64String = await imageToBase64(files[0])
        setFormData(prevData => ({
          ...prevData, 
          [name]: base64String
        }))
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
      } catch (error) {
        console.error("Error converting image to base64:", error)
        setErrors(prevErrors => ({ ...prevErrors, [name]: 'Error processing image' }))
      }
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<BlogPost> = {}
    let isValid = true

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof BlogPost] = 'This field is required'
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const values = {
        slug: formData.slug,
        title: formData.title,
        subtitle:  formData.subtitle,
        content:  formData.content,
        coverimage:  formData.coverImage,
        authorName: formData.authorName,
        authorAvatar: formData.authorAvatar,
        authorRole: formData.authorRole
      }
      mutate.mutate(values)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Create a New Blog Post</h2>
        <p className="text-gray-500 mt-2">Share your thoughts with the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Why AdByteHub?"
                value={formData.title}
                onChange={handleInput}
                className={`bg-gray-50 border transition-all focus:ring-2 focus:ring-emerald-500 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-gray-700 font-medium">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                placeholder="A Blog on Marketing"
                value={formData.subtitle}
                onChange={handleInput}
                className={`bg-gray-50 border transition-all focus:ring-2 focus:ring-emerald-500 ${errors.subtitle ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-700 font-medium">Content</Label>
            <div className="relative">
              <Textarea
                id="content"
                name="content"
                placeholder="<article><h1>My Blog</h1>..."
                value={formData.content}
                onChange={handleInput}
                className={`min-h-[200px] bg-gray-50 border transition-all focus:ring-2 focus:ring-emerald-500 ${errors.content ? 'border-red-500' : 'border-gray-200'}`}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-400">HTML formatting supported</span>
            </div>
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-gray-700 font-medium">Cover Image</Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageInput}
                className={`bg-gray-50 border file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all ${errors.coverImage ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-700 font-medium">Slug (auto-generated)</Label>
              <Input
              id="slug"
              name="slug"
              value={formData.slug}
              disabled
              className="bg-gray-100 border border-gray-200 text-gray-500"
              />

            </div>
          </div>

            <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
              <Label htmlFor="authorName" className="text-gray-700 font-medium">Author Name</Label>
              <Input
                id="authorName"
                name="authorName"
                placeholder="John Doe"
                value={formData.authorName}
                onChange={handleInput}
                className={`bg-gray-50 border transition-all focus:ring-2 focus:ring-emerald-500 ${errors.authorName ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>}
              </div>

              <div className="space-y-2">
              <Label htmlFor="authorRole" className="text-gray-700 font-medium">Author Role</Label>
              <Input
                id="authorRole"
                name="authorRole"
                placeholder="Content Writer"
                value={formData.authorRole}
                onChange={handleInput}
                className={`bg-gray-50 border transition-all focus:ring-2 focus:ring-emerald-500 ${errors.authorRole ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.authorRole && <p className="text-red-500 text-sm mt-1">{errors.authorRole}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
              <Label htmlFor="authorAvatar" className="text-gray-700 font-medium">Author Avatar</Label>
              <Input
                id="authorAvatar"
                name="authorAvatar"
                type="file"
                accept="image/*"
                onChange={handleImageInput}
                className={`bg-gray-50 border file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all ${errors.authorAvatar ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.authorAvatar && <p className="text-red-500 text-sm mt-1">{errors.authorAvatar}</p>}
              </div>
            </div>
            </div>

            <div className="pt-4">
            <Button 
              type="submit" 
                className="w-full bg-gray-900 text-white rounded-[10px] py-4 font-semibold shadow-sm hover:bg-gray-800 transition-all duration-200"
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogPostForm

