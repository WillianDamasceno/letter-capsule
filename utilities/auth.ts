import { serialize } from "cookie"
import { randomUUID } from "crypto"
import { toJson } from "./helpers"

export const isSignedIn = async () => {
  const [error, response] = await toJson(
    fetch("/api/verify-auth", {
      method: "POST",
    })
  )

  if (error) {
    return console.log({ error })
  }

  return response
}

export const createSignInCookie = () => {
  const signInToken = randomUUID()
  const signInCookie = serialize(
    String(process.env.SIGN_IN_TOKEN_HEADER_KEY),
    signInToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
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
