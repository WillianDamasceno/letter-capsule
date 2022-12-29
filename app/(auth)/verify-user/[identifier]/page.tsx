import { PrismaClient } from "@prisma/client"

const page = async ({ params }: any) => {
  const prisma = new PrismaClient()
  const urlParams = new URLSearchParams(`email=${params.identifier}`)
  const userEmail = urlParams.get("email") || undefined

  const user = await await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      verified: true,
    },
  })

  const isVerified = user?.verified

  return (
    <main>
      {isVerified ? (
        <>
          <h1>Your E-mail has been verified</h1>
          <a href="/sign-in">Click here to sign in</a>
        </>
      ) : (
        <>
          <h1>Your E-mail is not verified</h1>
          <span>
            Check your E-mail and click the magical link we sent to you
          </span>
        </>
      )}
    </main>
  )
}

export default page
