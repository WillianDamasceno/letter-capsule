"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { to, toJson } from "../../../utilities/helpers"

const sendConfirmationEmail = async (name: string, email: string) => {
  return await toJson(
    fetch("/api/auth/send-email-receipt-confirmation", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
      }),
    })
  )
}

const handleSubmit = async (
  e: React.SyntheticEvent,
  router: AppRouterInstance
) => {
  e.preventDefault()

  const target = e.target as typeof e.target & {
    name: { value: string }
    email: { value: string }
    password: { value: string }
  }

  const { name, email, password } = target

  if (!(name.value && email.value && password.value)) {
    return console.log("Fill every field")
  }

  const [errors, response] = await to(
    fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    })
  )

  if (errors) {
    return console.log({ errors })
  }

  if (response.redirected) {
    await sendConfirmationEmail(name.value, email.value)
    return router.push(response.url)
  }
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
      <h1 className="text-4xl">Sign Up</h1>

      <input
        type="text"
        placeholder="Name"
        name="name"
        className="w-full rounded-md border-2 border-zinc-600 py-3 px-6"
      />

      <input
        type="text"
        placeholder="E-mail"
        name="email"
        className="w-full rounded-md border-2 border-zinc-600 py-3 px-6"
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="w-full rounded-md border-2 border-zinc-600 py-3 px-6"
      />

      <div className="flex justify-between gap-4">
        <button className=" order-last rounded-md bg-rose-700 px-6 py-3 font-semibold hover:bg-rose-600 focus:bg-rose-600">
          Sign Up
        </button>
        <Link
          href="/sign-in"
          className="rounded-md border border-transparent bg-gray-500 px-6 py-3 font-semibold hover:border-white focus:border-white"
        >
          Sign In
        </Link>
      </div>
    </form>
  )
}

export default Form
