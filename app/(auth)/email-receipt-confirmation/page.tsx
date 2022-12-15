import type { NextPage } from "next"
import Link from "next/link"

const Page: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl">Thank you for registering</h1>

      <p className="text-xl">
        To confirm your e-mail, please click the magic link we sent to your
        e-mail
      </p>

      <Link href="/" className="text-rose-500 hover:text-rose-800">
        Go back to home
      </Link>
    </main>
  )
}

export default Page
