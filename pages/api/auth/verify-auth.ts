import { NextApiRequest, NextApiResponse } from "next"
import { apiActions } from "../../../utilities/api"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { setSuccess } = apiActions(res)

  const signInCookie = req.cookies[String(process.env.SIGN_IN_TOKEN_HEADER_KEY)]

  if (signInCookie) {
    return setSuccess({
      message: "User is signed in",
      data: [
        {
          isSignedIn: true,
        },
      ],
    })
  }

  return setSuccess({
    message: "User is not signed in",
    data: [
      {
        isSignedIn: false,
      },
    ],
  })
}
