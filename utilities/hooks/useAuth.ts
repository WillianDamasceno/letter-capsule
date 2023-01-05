import { useEffect, useState } from "react"
import { toJson } from "../helpers"

export const useAuth = (dependencies = []) => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      const [error, data] = await toJson(fetch("/api/auth/verify-auth"))

      if (error) {
        return console.error({ isSignInError: error })
      }
    
      const status = Boolean(data?.response?.data?.isSignedIn)

      setIsSignedIn(status)
    }

    verifyAuth()

    return () => setIsSignedIn(false)
  }, dependencies)

  return {isSignedIn}
}
