'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/components/login'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, SpaceIcon as Planet, User } from 'lucide-react'
import Image from 'next/image'

export default function AdminLogin() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)
    if (result.success) {
      router.push('/admin') // Redirect to admin dashboard on success
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel */}
        <div className="bg-gradient-to-tr from-emerald-600 to-purple-400 p-8 text-white flex flex-col">
          <div className="max-w-md">
            <h1 className="text-4xl font-light mb-6">Welcome</h1>
            <p className="text-lg opacity-90 mb-12">
            Adbytehub – Admin panel for managing adbytehub a performance marketing company</p>
          </div>
          
          {/* Hexagon Icons Grid */}
          {/* <div className="flex justify-center items-center gap-4 mt-auto">
            <div className="relative p-6 bg-white/10 rounded-xl">
              <Planet className="w-8 h-8 text-white" />
            </div>
            <div className="relative p-6 bg-white/10 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="relative p-6 bg-white/10 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div> */}
        </div>

        {/* Right Panel */}
        <div className="bg-white p-8 flex flex-col">
          <div className=" flex items-center gap-2">
            <div className="text-2xl font-medium">
              <Image
                src={"/logo1.png"}
                alt='adbytehub'
                height={500}
                width={500}
                className=' object-contain w-32'
              />
            </div>
          </div>

          <form action={handleSubmit} className="space-y-6 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="username">
                <span className='font-[600] text-xl'>Username</span> <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
              <span className='font-[600] text-xl'>Password</span> <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit"
              className="w-32 bg-gradient-to-tr from-emerald-600 to-purple-400 text-white"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

