"use client"

import { Letter } from "@prisma/client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { formatDateToInputValue } from "../../../../utilities/helpers"
import { RichText } from "../../../../components"

export const Form = ({ letter }: { letter: Letter | null }) => {
  const router = useRouter()

  const [title, setTitle] = useState(String(letter?.title))
  const [date, setDate] = useState(String(letter?.deliveryDate))
  const [content, setContent] = useState(String(letter?.content))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("This submit handler was not implemented yet")
  }

  return (
    <form onSubmit={handleSubmit} className="color-schema-dark grid gap-4">
      <div className="flex justify-between">
        <button
          className="rounded bg-gray-700 px-8 py-3 hover:bg-white hover:bg-opacity-5"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className="rounded bg-gray-700 px-8 py-3 hover:bg-white hover:bg-opacity-5">
          Save
        </button>
      </div>
      <div className="grid gap-4 sm:flex">
        <div className="w-full">
          <input
            className="block w-full rounded bg-gray-700 p-3"
            type="text"
            defaultValue={letter?.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            title="Delivery date"
            className="block w-full cursor-pointer rounded bg-gray-700 p-3 text-center sm:w-auto"
            type="date"
            defaultValue={formatDateToInputValue(String(letter?.deliveryDate))}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <RichText  content={content} setContent={setContent} />
    </form>
  )
}
