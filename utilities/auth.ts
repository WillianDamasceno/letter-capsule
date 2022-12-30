import jwt from "jsonwebtoken"
import { serialize } from "cookie"

import { toJson } from "./helpers"

export const isSignedIn = async () => {
  const [error, response] = await toJson(
    fetch("/api/auth/verify-auth", {
      method: "POST",
    })
  )

  if (error) {
    return console.log({ error })
  }

  return response
}

export const createSignInCookie = (userId: number, userEmail: string) => {
  const maxAge = 60 * 60

  const signInToken = jwt.sign(
    { userId, userEmail },
    String(process.env.JWT_PRIVATE_KEY),
    {
      expiresIn: maxAge,
    }
  )

  const signInCookie = serialize(
    String(process.env.SIGN_IN_TOKEN_HEADER_KEY),
    signInToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge,
      sameSite: "strict",
      path: "/",
    }
  )

  return signInCookie
}

export const createExpiredSignInCookie = () => {
  const signInCookie = serialize(
    String(process.env.SIGN_IN_TOKEN_HEADER_KEY),
    "",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }
  )

  return signInCookie
}
