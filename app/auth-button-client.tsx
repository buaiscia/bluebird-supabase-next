'use client'

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface AuthButtonClientProps {
  session: Session | null
}

export default function AuthButtonClient({ session }: AuthButtonClientProps) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github', options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
    console.log('signing in')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    console.log('signing out')
    router.refresh()
  }

  return session ? (
    <button onClick={handleSignOut}>Logout</button>
  ) : (
    <button onClick={handleSignIn}>Login</button>
  )
}
