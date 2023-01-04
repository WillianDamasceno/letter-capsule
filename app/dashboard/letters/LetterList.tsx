"use client"

import { Letter } from "@prisma/client"
import Link from "next/link"

import { useFetch } from "../../../utilities/hooks/useFetch"
import { LoadingIcon } from "../../../components/Icons"

type LetterItemProps = {
  title: string
  href?: string
  className?: string
}

const LetterItem = ({ title, href, className = "" }: LetterItemProps) => {
  return (
    <Link
      href={href || "#"}
      className={`bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline ${className}`}
    >
      {title}
    </Link>
  )
}

const LoadingFallback = () => {
  return (
    <div className="mx-auto flex max-w-2xl justify-center rounded bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline">
      <LoadingIcon className="h-6 animate-spin" />
    </div>
  )
}

const ErrorFallback = ({ refreshAction }: { refreshAction: () => any }) => {
  return (
    <button
      className="mx-auto flex w-full max-w-2xl justify-center rounded bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline"
      onClick={refreshAction}
    >
      Error trying to fetch the letters, click to refresh
    </button>
  )
}

export const LetterList = () => {
  const { data, error, finished, refetch } = useFetch(
    "/api/dashboard/get-letters",
    {},
    { callback: (response) => response.json() }
  )

  if (!finished) return <LoadingFallback />

  if (error) return <ErrorFallback refreshAction={refetch} />

  const letters = data.response.data as Letter[]

  return (
    <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded border-2 border-gray-700">
      {letters.length ? (
        letters.map((letter) => (
          <LetterItem
            key={letter.id}
            title={letter.title}
            href={`/dashboard/viewer/${letter.id}`}
          />
        ))
      ) : (
        <p className="text-center">No letter was found</p>
      )}
    </div>
  )
}
