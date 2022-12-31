import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"
import { NextApiRequest } from "next"

import { apiActions } from "../../../utilities/api"
import { getSignInCookieInfo } from "../../../utilities/auth"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { errors, setError, setSuccess } = apiActions(res)

  if (req.method !== "GET") {
    errors.push({ message: "This route just accepts GET requests" })
    return setError({ code: 405, errors })
  }

  const signInInfo = getSignInCookieInfo(req)

  const letters = await prisma.letter.findMany({
    where: {
      authorId: signInInfo?.payload?.userId,
    },
  })

  return setSuccess({data: letters})
}
