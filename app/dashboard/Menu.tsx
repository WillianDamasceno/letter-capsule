"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  DocumentTextIcon,
  MoonIcon,
  TrashIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"

import { SignOutButton } from "./SignOutButton"

function MenuLink({
  href,
  children,
  active = false,
  title = "",
}: {
  href: string
  children?: React.ReactNode
  active?: boolean
  title: string
}) {
  return (
    <Link
      href={href}
      className={`${
        active ? "bg-white bg-opacity-5" : ""
      } flex w-full items-center gap-3 rounded p-2 transition-colors hover:bg-white hover:bg-opacity-10`}
      title={title}
    >
      {children}
      <span className="leading-7 line-clamp-1">{title}</span>
    </Link>
  )
}

export function Menu() {
  const pathname = usePathname()
  const [isMenuVisible, setMenuVisibility] = useState(false)

  const closeMenuByBackdrop = (e: React.MouseEvent) => {
    const target = e.target as typeof e.target & { tagName: string }

    target?.tagName === "ASIDE" && setMenuVisibility(false)
  }

  return (
    <div>
      <button
        className="bg-rose-800 p-4 md:hidden"
        onClick={() => setMenuVisibility(true)}
      >
        =
      </button>

      <aside
        onClick={closeMenuByBackdrop}
        className={`
          absolute top-0 bottom-0 grid h-screen w-full bg-zinc-800 bg-opacity-25 transition-all md:static ${
            isMenuVisible ? "left-0" : "-left-full"
          }
        `}
      >
        <div className="flex h-full w-11/12 max-w-xs flex-col gap-2 bg-zinc-800 p-2 text-gray-300 md:w-full">
          <button
            className="block w-fit p-2 text-2xl text-white md:hidden"
            onClick={() => setMenuVisibility(false)}
          >
            x
          </button>

          <section className="py-2">
            <Link
              className="mx-auto grid w-36 max-w-full place-items-center rounded-xl border-2 border-gray-300 py-4 px-8 font-semibold hover:bg-white hover:bg-opacity-5"
              href="/dashboard/composer/new"
            >
              Compose
            </Link>
          </section>

          <section className="flex h-full flex-col gap-2">
            <MenuLink
              active={pathname?.includes("letters")}
              href="/dashboard/letters"
              title="Letters"
            >
              <EnvelopeIcon className="h-[1.25em]" />
            </MenuLink>

            <MenuLink
              active={pathname?.includes("sent")}
              href="/dashboard/sent"
              title="Sent"
            >
              <PaperAirplaneIcon className="h-[1.25em]" />
            </MenuLink>

            <MenuLink
              active={pathname?.includes("trash")}
              href="/dashboard/trash"
              title="Trash"
            >
              <TrashIcon className="h-[1.25em]" />
            </MenuLink>

            <hr className="border-gray-500" />
          </section>

          <hr className="border-gray-500" />

          <section className="flex flex-col gap-2">
            <button className="flex w-full items-center gap-3 rounded p-2 transition-colors hover:bg-white hover:bg-opacity-10">
              <MoonIcon className="h-[1.25em]" />
              Dark Mode
            </button>

            <button className="flex w-full items-center gap-3 rounded p-2 transition-colors hover:bg-white hover:bg-opacity-10">
              <InformationCircleIcon className="h-[1.25em]" />
              Help
            </button>

            <MenuLink
              active={pathname?.includes("about")}
              href="/dashboard/about"
              title="About"
            >
              <DocumentTextIcon className="h-[1.25em]" />
            </MenuLink>

            <SignOutButton />
          </section>
        </div>
      </aside>
    </div>
  )
}
