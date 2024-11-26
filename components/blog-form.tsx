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
      [name]: value
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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInput}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInput}
            className={errors.subtitle ? 'border-red-500' : ''}
          />
          {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>}
        </div>

        <div>
          <Label htmlFor="content">Content (add html tags for formating the blog)</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInput}
            className={`h-32 ${errors.content ? 'border-red-500' : ''}`}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div>
          <Label htmlFor="coverImage">Cover Image</Label>
          <Input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageInput}
            className={errors.coverImage ? 'border-red-500' : ''}
          />
          {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInput}
            className={errors.slug ? 'border-red-500' : ''}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        </div>

        <div>
          <Label htmlFor="authorName">Author Name</Label>
          <Input
            id="authorName"
            name="authorName"
            value={formData.authorName}
            onChange={handleInput}
            className={errors.authorName ? 'border-red-500' : ''}
          />
          {errors.authorName && <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>}
        </div>

        <div>
          <Label htmlFor="authorRole">Author Role</Label>
          <Input
            id="authorRole"
            name="authorRole"
            value={formData.authorRole}
            onChange={handleInput}
            className={errors.authorRole ? 'border-red-500' : ''}
          />
          {errors.authorRole && <p className="text-red-500 text-sm mt-1">{errors.authorRole}</p>}
        </div>

        <div>
          <Label htmlFor="authorAvatar">Author Avatar</Label>
          <Input
            id="authorAvatar"
            name="authorAvatar"
            type="file"
            accept="image/*"
            onChange={handleImageInput}
            className={errors.authorAvatar ? 'border-red-500' : ''}
          />
          {errors.authorAvatar && <p className="text-red-500 text-sm mt-1">{errors.authorAvatar}</p>}
        </div>

        <div>
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogPostForm

