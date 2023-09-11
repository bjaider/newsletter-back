import {Request, Response} from 'express'
import Recipient from '../models/Recipient'
import {sendEmail} from '../utils/emailService'

export const addRecipient = async (req: Request, res: Response) => {
  try {
    const {email} = req.body
    const existingRecipient = await Recipient.findOne({email})

    if (existingRecipient) {
      return res.status(400).json({message: 'Recipient already exists'})
    }

    const recipient = new Recipient({email, unsubscribed: false})
    await recipient.save()
    const html = `
  <html>
  <head>
      <style>
          body, p {
              margin: 0;
              padding: 0;
          }
  
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              text-align: center;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333;
          }
  
          p {
              color: #555;
              font-size: 16px;
              line-height: 1.5;
              margin-top: 20px;
          }
  
          .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007BFF;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
  
          .button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to Our Newsletter</h1>
          <p>Thank you for subscribing to our newsletter. We'll keep you updated with the latest news and updates.</p>
      </div>
  </body>
  </html>
  `
    try {
      sendEmail([email], 'Welcome to Our Newsletter', html)
    } catch (error) {}

    return res.status(201).json(recipient)
  } catch (error) {
    console.error(error)
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
    console.error(error)
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
    console.error(error)
    return res.status(500).json({message: 'Server Error'})
  }
}
