import { cookies } from "next/headers"
import Link from "next/link"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline"

import { decodeJwt } from "../../../../utilities/auth"
import { prisma } from "../../../../prisma/config"
import { formatDateToInputValue } from "../../../../utilities/helpers"

type PageProps = {
  params: {
    id: string
  }
}

const Page = async ({ params }: PageProps) => {
  const allCookies = cookies()
  const signInToken = allCookies.get(
    String(process.env.SIGN_IN_TOKEN_HEADER_KEY)
  )?.value

  const signInInfo = decodeJwt(String(signInToken))
  const authorId = signInInfo?.payload?.userId

  const letterIds = await prisma.letter.findMany({
    select: { id: true },
    where: {
      draft: true,
    },
  })

  const ids = letterIds.reduce(
    (acc, letter) => [...acc, letter.id],
    [] as number[]
  )

  const letter = await prisma.letter.findFirst({
    where: { id: Number(params?.id), authorId },
  })

  const currentLetterIndex = ids.indexOf(Number(params?.id))

  const previousLetterId = ids[currentLetterIndex - 1]
  const nextLetterId = ids[currentLetterIndex + 1]

  return (
    <section className="p-8 text-gray-300">
      <header className="mb-2 flex justify-between rounded bg-gray-700">
        <div className="flex">
          <Link
            title="Edit letter"
            className="p-3 text-center hover:bg-white hover:bg-opacity-5"
            href={`/dashboard/composer/${params.id}`}
          >
            <PencilSquareIcon className="w-8 p-1" />
          </Link>
          <button
            title="Delete Letter"
            className="p-3 text-center hover:bg-white hover:bg-opacity-5"
          >
            <TrashIcon className="w-8 p-1" />
          </button>
          <button
            title="Schedule Letter"
            className="p-3 text-center hover:bg-white hover:bg-opacity-5"
          >
            <CalendarDaysIcon className="block w-8 p-1" />
          </button>
          <button
            title="Unschedule Letter"
            className="relative p-3 text-center after:absolute after:inset-0 after:m-auto after:block after:h-8 after:w-[2px] after:origin-center after:rotate-45 after:rounded after:bg-current hover:bg-white hover:bg-opacity-5"
          >
            <CalendarDaysIcon className="block w-8 p-1" />
          </button>
          <input
            title="Delivery date"
            className="w-full cursor-pointer bg-transparent p-3 text-center hover:bg-white hover:bg-opacity-5"
            type="date"
            defaultValue={formatDateToInputValue(String(letter?.deliveryDate))}
          />
        </div>

        <nav className="flex items-center gap-4">
          <div>
            <span>{currentLetterIndex + 1}</span> of{" "}
            <span>{letterIds.length}</span>
          </div>

          <div className="flex h-full gap-2">
            <Link
              href={`/dashboard/viewer/${previousLetterId}`}
              className={
                previousLetterId
                  ? ""
                  : "pointer-events-none text-white text-opacity-40"
              }
            >
              <ChevronLeftIcon className="h-full w-12 p-3 hover:bg-white hover:bg-opacity-5" />
            </Link>
            <Link
              href={`/dashboard/viewer/${nextLetterId}`}
              className={
                nextLetterId
                  ? ""
                  : "pointer-events-none text-white text-opacity-40"
              }
            >
              <ChevronRightIcon className="h-full w-12 p-3 hover:bg-white hover:bg-opacity-5" />
            </Link>
          </div>
        </nav>
      </header>

      <article className="rounded bg-gray-700 p-6">
        <h1 className="mb-4 text-2xl italic underline decoration-2">
          {letter?.title}
        </h1>

        <div
          className="leading-7"
          dangerouslySetInnerHTML={{
            __html: String(letter?.content),
          }}
        />
      </article>
    </section>
  )
}

export default Page
