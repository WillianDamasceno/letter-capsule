"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"

import { to } from "../../../utilities/helpers"

const handleSubmit = async (
  e: React.SyntheticEvent,
  router: AppRouterInstance
) => {
  e.preventDefault()

  const target = e.target as typeof e.target & {
    email: { value: string }
    password: { value: string }
  }

  const { email, password } = target

  if (!(email.value && password.value)) {
    return console.log("Fill every field")
  }

  const [errors, res] = await to(
    fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
  )

  if (errors) {
    return console.log({ errors })
  }

  const response = await res

  if (response.redirected) {
    return router.push(response.url)
  }

  console.log({ message: "Something went wrong", response })
}

const Form = () => {
  const router = useRouter()
  const formRef = useRef(null)

  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleSubmit(e, router)}
      className="color-schema-dark grid w-11/12 max-w-md gap-4 rounded-lg border-2 border-zinc-300 p-6 text-zinc-300 accent-rose-600 md:p-10"
    >
      <h1 className="text-4xl">Sign In</h1>

      <input
        type="text"
        placeholder="E-mail"
        name="email"
        className="w-full rounded border-2 border-zinc-600 py-3 px-6"
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="w-full rounded-lg border-2 border-zinc-600 py-3 px-6"
      />

      <div className="flex justify-between gap-4">
        <button className=" order-last rounded bg-rose-700 px-6 py-3 font-semibold hover:bg-rose-600 focus:bg-rose-600">
          Sign In
        </button>
        <Link
          href="/sign-up"
          className="rounded border border-transparent bg-gray-500 px-6 py-3 font-semibold hover:border-white focus:border-white"
        >
          Sign Up
        </Link>
      </div>
    </form>
  )
}

export default Form
