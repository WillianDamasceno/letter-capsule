import { Letter } from "@prisma/client"
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

  if (!["POST", "PUT"].includes(String(req.method))) {
    errors.push({
      message: "This route just accepts POST or PUT requests",
      data: [{ methodUsed: req.method }],
    })
    return setError({ code: 405, errors })
  }

  const body = JSON.parse(req.body) as {
    id?: number
    title: string
    date: string
    content: string
  }
  const { id, title, date, content } = body

  if (!(title && date && typeof content === "string")) {
    errors.push({ message: "Every field must be filled" })
  }

  if (req.method === "PUT" && body.id === null) {
    errors.push({ message: "No letter ID was provided" })
  }
  
  if (errors.length) {
    return setError({ errors })
  }

  const data = {
    title,
    deliveryDate: new Date(date),
    content,
    authorId: signInInfo?.payload.userId,
  }

  let letter: Letter | null = null

  if (req.method === "POST") {
    letter = await prisma.letter.create({ data })
  } else {
    letter = await prisma.letter.update({ data, where: { id } })
  }

  if (!letter) {
    errors.push({ message: "Something went wrong trying to set the letter" })
    return setError({ errors })
  }

  return setSuccess({ data: letter })
}
