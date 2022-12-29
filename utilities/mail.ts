import mail from "nodemailer"

export const mailTransporters = {
  main: mail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  }),
}
