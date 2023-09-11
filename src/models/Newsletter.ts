import mongoose, {Schema, Document} from 'mongoose'

export interface NewsletterModel extends Document {
  subject: String
  emailBody: String
  file: String
  fileName: String
  recipients: [String]
  scheduledAt: Date
}

const newsletterSchema = new Schema({
  subject: String,
  emailBody: String,
  file: String,
  fileName: String,
  recipients: [String],
  scheduledAt: Date,
})

export default mongoose.model<NewsletterModel>('Newsletter', newsletterSchema)
