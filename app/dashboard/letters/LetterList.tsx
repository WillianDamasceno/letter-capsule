"use client"

import { Letter } from "@prisma/client"
import Link from "next/link"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

import { useFetch } from "../../../utilities/hooks"
import { LoadingIcon } from "../../../components/Icons"

type LetterItemProps = {
  letter: Letter
}

const LetterItem = ({ letter }: LetterItemProps) => {
  return (
    <div className="flex justify-between bg-gray-600 bg-opacity-25 odd:bg-gray-700 [&:hover_.actions]:opacity-100">
      <Link
        className="flex w-full items-center pl-4 hover:underline"
        href={`/dashboard/viewer/${letter.id} `}
      >
        {letter.title}
      </Link>

      <div className="actions flex opacity-0 transition">
        <Link
          title="Edit letter"
          className="p-3 text-center hover:bg-white hover:bg-opacity-5"
          href={`/dashboard/composer/${letter.id}`}
        >
          <PencilSquareIcon className="w-8 p-1" />
        </Link>
        <button
          title="Delete Letter"
          className="p-3 text-center hover:bg-white hover:bg-opacity-5"
        >
          <TrashIcon className="w-8 p-1" />
        </button>
      </div>
    </div>
  )
}

const LoadingFallback = () => {
  return (
    <div className="flex justify-center rounded bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline">
      <LoadingIcon className="h-6 animate-spin" />
    </div>
  )
}

const ErrorFallback = ({ refreshAction }: { refreshAction: () => any }) => {
  return (
    <button
      className="flex w-full justify-center rounded bg-gray-600 bg-opacity-25 p-4 odd:bg-gray-700 hover:underline"
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
    <>
      {letters.length ? (
        letters.map((letter) => <LetterItem key={letter.id} letter={letter} />)
      ) : (
        <span className="p-4 bg-gray-700 text-center">No letter was found</span>
      )}
    </>
  )
}
