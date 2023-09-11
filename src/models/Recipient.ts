import mongoose, {Schema, Document} from 'mongoose'

export interface RecipientModel extends Document {
  email: string
  unsubscribed: boolean
}

const recipientSchema = new Schema({
  email: String,
  unsubscribed: Boolean,
})

export default mongoose.model<RecipientModel>('Recipient', recipientSchema)
