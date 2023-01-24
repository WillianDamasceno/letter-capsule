import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import { prisma } from "../../../prisma/config"

import { apiActions } from "../../../utilities/api"
import { decodeJwt } from "../../../utilities/auth"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const signInToken = req.cookies[String(process.env.SIGN_IN_TOKEN_HEADER_KEY)]
  const signInInfo = decodeJwt(signInToken)

  if (!signInInfo?.payload.userId) {
    return res.redirect(301, "/sign-in")
  }

  const { errors, setError, setSuccess } = apiActions(res)

  if (req.method !== "GET") {
    errors.push({ message: "This route just accepts GET requests" })
    return setError({ code: 405, errors })
  }

  const letters = await prisma.letter.findMany({
    where: { authorId: signInInfo?.payload?.userId },
    orderBy: { deliveryDate: "asc" },
  })

  return setSuccess({ data: letters })
}
