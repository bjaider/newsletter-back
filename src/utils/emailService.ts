import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
})

export const sendEmail = async (
  to: string[],
  subject: string,
  html: string,
  attachment?: {name: string; file: string},
) => {
  try {
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to,
      subject,
      html,
      attachments: attachment
        ? [
            {
              filename: attachment.name,
              content: attachment.file,
              encoding: 'base64',
            },
          ]
        : [],
    }

    for (const recipient of to) {
      const unsubscribeLink = `${process.env.FRONT_END_URL}/unsubscribe/${recipient}`
      const htmlWithUnsubscribeLink = `${html}<p>If you want to unsubscribe from our newsletter, click <a href="${unsubscribeLink}">here</a>.</p>`

      mailOptions.html = htmlWithUnsubscribeLink
      mailOptions.to = [recipient]

      await transporter.sendMail(mailOptions)
    }
  } catch (error) {
    throw error
  }
}
