"use client"

import { Letter } from "@prisma/client"
import { FormEvent, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import type ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { formatDateToInputValue, toJson } from "../../../../utilities/helpers"
import { RichText } from "../../../../components"

type FormProps = {
  letter: Letter | null
}

export const Form = ({ letter }: FormProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [title, setTitle] = useState(String(letter?.title || ""))
  const [date, setDate] = useState(String(letter?.deliveryDate || new Date()))

  const richTextRef = useRef<ReactQuill>(null)

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    pathname: string | null
  ) => {
    e.preventDefault()

    const requestMethod = pathname?.includes("new") ? "POST" : "PUT"

    const [error, data, response] = await toJson(
      fetch(`/api/dashboard/set-letter`, {
        method: requestMethod,
        body: JSON.stringify({
          id: letter?.id,
          title,
          date,
          content: richTextRef?.current?.value || "",
        }),
      })
    )

    if (data.success) {
      router.push("/dashboard/letters")
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e, pathname)}
      className="color-schema-dark grid gap-4"
    >
      <div className="flex justify-between">
        <button
          type="button"
          className="rounded bg-gray-700 px-8 py-3 hover:bg-white hover:bg-opacity-5"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-gray-700 px-8 py-3 hover:bg-white hover:bg-opacity-5"
        >
          Save
        </button>
      </div>
      <div className="grid gap-4 sm:flex">
        <div className="w-full">
          <input
            className="block w-full rounded bg-gray-700 p-3"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <input
            title="Delivery date"
            className="block w-full cursor-pointer rounded bg-gray-700 p-3 text-center sm:w-auto"
            type="date"
            defaultValue={formatDateToInputValue(date)}
            onChange={(e) => setDate(e.target.value)}
            min={formatDateToInputValue(String(new Date()))}
          />
        </div>
      </div>

      <RichText ref={richTextRef} defaultValue={letter?.content} />
    </form>
  )
}
