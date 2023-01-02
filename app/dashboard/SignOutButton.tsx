"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

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
      className="side-menu-button"
      onClick={() => {
        handleSignOut(router)
      }}
    >
      <ArrowRightOnRectangleIcon className="h-[1.25em]" />
      Sign Out
    </button>
  )
}
