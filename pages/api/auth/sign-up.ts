import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../prisma/config"
import { apiActions, ApiResponse } from "../../../utilities/api"

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { setError, errors } = apiActions(res)
  const { name, email, password } = JSON.parse(req.body)

  if (req.method !== "POST") {
    errors.push({ message: "This route just accepts POST requests" })
    return setError({ code: 405, errors })
  }

  if (!(name && email && password)) {
    errors.push({ message: "Every field should be filled" })
    return setError({ errors })
  }

  const isExistentUser = Boolean(await prisma.user.findUnique({
    where: {
      email,
    },
  }))

  if (isExistentUser) {
    errors.push({ message: "This e-mail is already registered" })
    return setError({ errors })
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })

  if (errors.length) {
    return setError({ errors })
  }

  return res.redirect(307, "/email-receipt-confirmation")
} 
