import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import { prisma } from "../../../prisma/config"

import { apiActions } from "../../../utilities/api"
import { decodeJwt } from "../../../utilities/auth"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { errors, setError, setSuccess } = apiActions(res)

  if (req.method !== "GET") {
    errors.push({ message: "This route just accepts GET requests" })
    return setError({ code: 405, errors })
  }

  const signInToken = req.cookies[String(process.env.SIGN_IN_TOKEN_HEADER_KEY)]
  const signInInfo = decodeJwt(signInToken)

  const letters = await prisma.letter.findMany({
    where: {
      authorId: signInInfo?.payload?.userId,
    },
  })

  return setSuccess({data: letters})
}
