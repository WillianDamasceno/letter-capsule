"use client"

import { Letter } from "@prisma/client"
import Link from "next/link"
import { useFetch } from "../../../utilities/hooks/useFetch"

type LetterItemProps = {
  title: string
  href?: string
  className?: string
}

const LetterItem = ({ title, href = "#", className = "" }: LetterItemProps) => {
  return (
    <Link
      href={href || "#"}
      className={`bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline ${className}`}
    >
      {title}
    </Link>
  )
}

export const LetterList = () => {
  const { data, error, finished, refetch } = useFetch(
    "/api/dashboard/get-letters",
    {},
    { callback: (response) => response.json() }
  )

  if (error) return null
  if (!finished) return null

  const letters = data.response.data as Letter[]

  return (
    <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-lg border-2 border-gray-700">
      {letters.length ? (
        letters.map((letter) => (
          <LetterItem key={letter.id} title={letter.title} />
        ))
      ) : (
        <p className="text-center">No letter was found</p>
      )}
    </div>
  )
}
