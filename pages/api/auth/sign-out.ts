import type { NextApiRequest, NextApiResponse } from "next"

import { createExpiredSignInCookie } from '../../../utilities/auth';
import { apiActions, ApiResponse } from "../../../utilities/api"

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { setError, errors } = apiActions(res)

  if (req.method !== "GET") {
    errors.push({ message: "This route just accepts GET requests" })
    return setError({ code: 405, errors })
  }

  const signInCookie = createExpiredSignInCookie()

  res.setHeader("Set-Cookie", signInCookie)
  res.redirect(301, "/sign-in")
}
