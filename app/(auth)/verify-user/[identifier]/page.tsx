import { prisma } from "../../../../prisma/config"

const Page = async ({ params }: any) => {
  const urlParams = new URLSearchParams(`email=${params.identifier}`)
  const userEmail = urlParams.get("email") || undefined

  const user = await prisma.user.update({
    where: { email: userEmail },
    data: { verified: true },
  })

  if (user?.verified) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-4xl">Your E-mail has been verified</h1>
        <a
          href="/sign-in"
          className="font-semibold drop-shadow-lg underline text-red-700 hover:text-red-600"
        >
          Click here to sign in
        </a>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-4xl">Your E-mail is not verified</h1>
      <span>Check your E-mail and click the magical link we sent to you</span>
    </div>
  )
}

export default Page
