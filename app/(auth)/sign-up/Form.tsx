"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { to, toJson } from "../../../utilities/helpers"

const sendConfirmationEmail = async (name: string, email: string) => {
  return await toJson(fetch("/api/send-email-receipt-confirmation", {
    method: "POST",
    body: JSON.stringify({
      name,
      email
    })
  }))
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
    fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    })
  )

  if (errors) {
    return console.log({errors})
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
      className="grid gap-4 border-2 border-zinc-600 p-10 text-zinc-600"
    >
      <h1 className="text-2xl">Sign Up</h1>

      <input
        type="text"
        placeholder="Name"
        name="name"
        className="border-2 border-zinc-600 py-2 px-6"
      />

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
