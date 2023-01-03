"use client"

import Link from "next/link"
import { useState } from "react"
import {
  DocumentTextIcon,
  MoonIcon,
  FolderIcon,
  FolderOpenIcon,
  TrashIcon,
  EnvelopeIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline"

import { SignOutButton } from "./SignOutButton"

export const Menu = () => {
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
              href="/dashboard/composer"
            >
              Compose
            </Link>
          </section>

          <section className="flex h-full flex-col gap-2">
            <Link
              href="/dashboard/letters"
              className="side-menu-button"
              title="Letters"
            >
              <EnvelopeIcon className="h-[1.25em]" />
              <span className="leading-7 line-clamp-1">Letters</span>
            </Link>

            <Link
              href="/dashboard/sent"
              className="side-menu-button"
              title="Sent"
            >
              <PaperAirplaneIcon className="h-[1.25em]" />
              <span className="leading-7 line-clamp-1">Sent</span>
            </Link>

            <Link
              href="/dashboard/trash"
              className="side-menu-button"
              title="Trash"
            >
              <TrashIcon className="h-[1.25em]" />
              <span className="leading-7 line-clamp-1">Trash</span>
            </Link>

            <hr className="border-gray-500" />

            <div className="flex flex-col gap-2 overflow-scroll">
              <Link href="#" className="side-menu-button" title="Folder">
                <FolderIcon className="h-[1.25em]" />
                <span className="leading-7 line-clamp-1">Folder</span>
              </Link>

              <Link
                href="#"
                className="side-menu-button bg-white bg-opacity-5"
                title="Opened Folder"
              >
                <FolderOpenIcon className="h-[1.25em]" />
                <span className="leading-7 line-clamp-1">Opened Folder</span>
              </Link>
            </div>
          </section>

          <hr className="border-gray-500" />

          <section className="flex flex-col gap-2">
            <button className="side-menu-button">
              <MoonIcon className="h-[1.25em]" />
              Dark Mode
            </button>

            <Link href="/about" className="side-menu-button">
              <DocumentTextIcon className="h-[1.25em]" />
              About
            </Link>

            <SignOutButton />
          </section>
        </div>
      </aside>
    </div>
  )
}
