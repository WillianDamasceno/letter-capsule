import type { NextApiRequest, NextApiResponse } from "next"

import { PrismaClient } from "@prisma/client"
import { apiActions, ApiResponse } from "../../utilities/api"

const prisma = new PrismaClient()

export default async (
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

  if (!user || !user.verified || user.password !== password) {
    errors.push({ message: "The e-mail or the password is wrong!" })
    return setError({ errors })
  }

  if (errors.length) {
    return setError({ errors })
  }

  res.redirect(301, "/dashboard/letters")
}
