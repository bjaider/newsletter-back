import {Request, Response} from 'express'
import Recipient from '../models/Recipient'
import {sendEmail} from '../utils/emailService'
import {welcomeTemplate} from '../utils/welcomeTemplate'

export const addRecipient = async (req: Request, res: Response) => {
  try {
    const {email} = req.body
    const existingRecipient = await Recipient.findOne({email})

    if (existingRecipient) {
      return res.status(400).json({message: 'Recipient already exists'})
    }

    const recipient = new Recipient({email, unsubscribed: false})
    await recipient.save()
    try {
      sendEmail([email], 'Welcome to Our Newsletter', welcomeTemplate)
    } catch (error) {}

    return res.status(201).json(recipient)
  } catch (error) {
    return res.status(500).json({message: 'Server Error'})
  }
}
export const listRecipients = async (req: Request, res: Response) => {
  try {
    const totalRecipients = await Recipient.countDocuments({})

    const subscribedRecipients = await Recipient.countDocuments({
      unsubscribed: false,
    })
    const unsubscribedRecipients = await Recipient.countDocuments({
      unsubscribed: true,
    })

    const recipients = await Recipient.find({unsubscribed: false})

    return res.status(200).json({
      totalRecipients,
      subscribedRecipients,
      unsubscribedRecipients,
      recipients,
    })
  } catch (error) {
    return res.status(500).json({message: 'Server Error'})
  }
}
export const unsubscribeRecipient = async (req: Request, res: Response) => {
  try {
    const {email} = req.body

    const recipient = await Recipient.findOne({email})

    if (!recipient) {
      return res.status(404).json({message: 'Recipient not found'})
    }

    recipient.unsubscribed = true
    await recipient.save()

    return res
      .status(200)
      .json({message: 'Recipient unsubscribed successfully'})
  } catch (error) {
    return res.status(500).json({message: 'Server Error'})
  }
}
