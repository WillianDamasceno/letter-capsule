import { NextApiRequest } from "next"
import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

import { toJson } from "./helpers"

export const isSignedIn = async (callback?: (isSignedIn: boolean) => any) => {
  const [error, data] = await toJson(fetch("/api/auth/verify-auth"))

  if (error) {
    return console.error({ isSignInError: error })
  }

  const status = data?.response?.data?.isSignedIn

  return callback ? callback(status) : status
}

type UserSignInCookieInfo = {
  userId: number
  userEmail: string
}

export const createSignInCookie = (user: User) => {
  const maxAge = 60 * 60
  const cookieInfo: UserSignInCookieInfo = {
    userId: user.id,
    userEmail: user.email,
  }

  const signInToken = jwt.sign(
    cookieInfo,
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

export const decodeJwt = (signInToken: string | undefined) => {
  if (typeof signInToken !== "string") return

  const decodedInfo = jwt.decode(signInToken, { complete: true, json: true })

  if (!decodedInfo) return

  const info = Object.assign(decodedInfo, {
    payload: decodedInfo.payload as UserSignInCookieInfo,
  })

  return info
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
