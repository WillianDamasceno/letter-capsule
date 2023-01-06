import { cookies } from "next/headers"

import { prisma } from "../../../../prisma/config"
import { decodeJwt } from "../../../../utilities/auth"
import { Form } from "./Form"

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

  const letter = await prisma.letter.findFirst({
    where: { id: Number(params?.id), authorId },
  })

  return (
    <section className="grid gap-4 p-8 text-gray-300 max-w-5xl mx-auto">
      <Form letter={letter} />
    </section>
  )
}

export default Page
