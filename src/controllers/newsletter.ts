import {Request, Response} from 'express'
import Newsletter from '../models/Newsletter'
import {sendEmail} from '../utils/emailService'

export const getAllNewsletter = async (req: Request, res: Response) => {
  try {
    const totalNewsletters = await Newsletter.countDocuments({})
    const newsletters = await Newsletter.find()
    return res.status(201).json({totalNewsletters, newsletters})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Server Error'})
  }
}

export const sendNewsletter = async (req: Request, res: Response) => {
  try {
    const {emails, subject, html, attachment} = req.body
    sendEmail(emails, subject, html, attachment)
    const newNewsletter = new Newsletter({
      subject,
      emailBody: html,
      file: attachment.file,
      fileName: attachment.name,
      recipients: emails,
    })

    await newNewsletter.save()
    return res.status(200).json({message: 'Newsletter sent successfully'})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Server Error'})
  }
}
