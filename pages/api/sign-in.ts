import type { NextApiRequest, NextApiResponse } from "next"

import { PrismaClient } from "@prisma/client"

import type { ApiResponse } from "../../utilities/api"

import { apiActions } from "../../utilities/api"

const prisma = new PrismaClient()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { setError, errors } = apiActions(res)
  const { email, password } = JSON.parse(req.body)

  if (!(email && password)) {
    errors.push({ message: "Every field should be filled" })
    return setError({ errors })
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  // if (error) {
  //   if (error?.meta?.target.includes("email")) {
  //     errors.push({ message: "This e-mail is already registered" })
  //     return setError({ errors })
  //   }

  //   errors.push({ message: "Server error" })
  //   return setError({ errors })
  // }

  if (!user || user.password !== password) {
    errors.push({ message: "The e-mail or the password is wrong!" })
    return setError({ errors })
  }

  if (errors.length) {
    return setError({ errors })
  }

  res.redirect(301, "/composer")
}

export default handler
