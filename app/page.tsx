import Link from "next/link"

const Page = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-gray-600">
      <h1 className="text-6xl italic text-rose-600 underline">
        Letter Capsule
      </h1>

      <div className="flex gap-4">
        <Link
          href="/sign-up"
          className="bg-rose-600 py-2 rounded px-8 transition-colors hover:bg-rose-800"
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className="border border-rose-600 py-2 rounded px-8 transition-colors hover:border-transparent hover:bg-rose-800"
        >
          Sign In
        </Link>
      </div>
    </main>
  )
}

export default Page
