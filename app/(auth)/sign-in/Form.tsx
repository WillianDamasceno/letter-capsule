"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { useRef } from "react"

import { to } from "../../../utilities/helpers"

const handleSubmit = async (e: React.SyntheticEvent, router: AppRouterInstance) => {
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
    return console.log(errors)
  }
  
  const response = await res

  if (response.redirected) {
    return router.push(response.url)
  }

  console.log({message: "Something went wrong", response})
}

const Form = () => {
  const router = useRouter()
  const formRef = useRef(null)

  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleSubmit(e, router)}
      className="grid gap-4 border-2 border-zinc-600 p-10 text-zinc-600"
    >
      <h1 className="text-2xl">Sign In</h1>

      <input
        type="text"
        placeholder="E-mail"
        name="email"
        className="border-2 border-zinc-600 py-2 px-6"
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border-2 border-zinc-600 py-2 px-6"
      />

      <button>Submit</button>
    </form>
  )
}

export default Form
