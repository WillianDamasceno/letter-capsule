"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { isSignedIn } from "../../utilities/auth"

import { to } from "../../utilities/helpers"

const handleSignOut = async (router: AppRouterInstance) => {
  const [error, response] = await to(fetch("/api/auth/sign-out"))

  if (error) {
    return console.log({ error })
  }

  if (response.redirected) {
    router.push(response.url)
  }
}

export const SignOutButton = () => {
  const router = useRouter()

  useEffect(() => {
    isSignedIn((status) => status || router.push("/sign-in"))
  }, [])

  return (
    <button
      className="bg-rose-600 py-2 px-8 transition-colors hover:bg-rose-800"
      onClick={() => {
        handleSignOut(router)
      }}
    >
      Sign Out
    </button>
  )
}
