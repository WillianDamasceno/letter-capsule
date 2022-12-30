import { NextApiRequest, NextApiResponse } from "next"
import { SendMailOptions } from "nodemailer"
import { mailTransporters } from "../../utilities/mail"
import { apiActions, ApiResponse } from "../../utilities/api"

export default (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  const { setError, errors } = apiActions(res)

  if (req.method !== "POST") {
    errors.push({ message: "This route just accepts POST requests" })
    return setError({ code: 405, errors })
  }

  const { name, email } = JSON.parse(req.body)

  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Letter Capsule - Email Confirmation",
    html: `
      <html>
        <body>
          <main>
            <h1>
              Thank you for registering <i>${name}</i>
            </h1>

            <p>
              To confirm your e-mail,
              <i>
                <a href="${process.env.HOST}/verify-user/${email}">
                  please click this magic link!
                </a>
              </i>
            </p>
          </main>
        </body>
      </html>
    `,
  }

  const transporter = mailTransporters.main

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log({ error })
    } else {
      console.log("Email sent: " + info.response)
    }
  })

  res.status(200).json({ success: true })
}
