import type { NextApiRequest, NextApiResponse } from "next"

import { PrismaClient } from "@prisma/client"

import type { ApiResponse } from "../../utilities/api"

import { apiActions } from "../../utilities/api"
import { to } from "../../utilities/helpers"

const prisma = new PrismaClient()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { setError, errors } = apiActions(res)
  const { name, email, password } = JSON.parse(req.body)

  if (!(name && email && password)) {
    errors.push({ message: "Every field should be filled" })
    return setError({ errors })
  }

  const [error] = await to(
    prisma.user.create({
      data: {
        name,
        email,
      },
    })
  )

  if (error) {
    if (error?.meta?.target.includes("email")) {
      errors.push({ message: "This e-mail is already registered" })
      return setError({ errors })
    }

    errors.push({ message: "Server error" })
    return setError({ errors })
  }

  if (errors.length) {
    return setError({ errors })
  }

  return res.redirect(307, "/email-receipt-confirmation")
}

export default handler
