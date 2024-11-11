'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'fallback_secret_key_for_development')

export async function login(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  // Hardcoded credentials
  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'admin@258'

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create a JWT token
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secretKey)

    // Set the token in a cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600
    })

    return { success: true, message: 'Login successful' }
  } else {
    return { success: false, message: 'Invalid credentials' }
  }
}