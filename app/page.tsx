import type { NextPage } from "next"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-6xl italic text-rose-600 underline">
        Letter Capsule
      </h1>

      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="bg-rose-600 py-2 px-8 transition-colors hover:bg-rose-800"
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className="border border-rose-600 py-2 px-8 transition-colors hover:border-transparent hover:bg-rose-800"
        >
          Sign In
        </Link>
      </div>
    </main>
  )
}

export default Home
