"use client"

import { useState } from "react"

import { SignOutButton } from "./SignOutButton"

export const Menu = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false)

  return (
    <div>
      <button
        className="bg-rose-800 p-4 md:hidden"
        onClick={() => setMenuVisibility(true)}
      >
        =
      </button>

      <aside
        onClick={(e) => {
          const target = e.target as typeof e.target & { tagName: string }

          target?.tagName === "ASIDE" && setMenuVisibility(false)
        }}
        className={`
          absolute top-0 bottom-0 min-h-screen w-full bg-zinc-800 bg-opacity-25 transition-all md:static ${
            isMenuVisible ? "left-0" : "-left-full"
          }
        `}
      >
        <div className="h-full w-11/12 max-w-xs bg-zinc-800">
          <div className="flex justify-between">
            <SignOutButton />

            <button
              className="text-2xl text-white md:hidden"
              onClick={() => setMenuVisibility(false)}
            >
              x
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
