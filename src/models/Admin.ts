import mongoose, { Schema, Document } from 'mongoose';

export interface AdminModel extends Document {
  username: string;
  password: string;
}

const adminSchema = new Schema({
  username: String,
  password: String,
});

export default mongoose.model<AdminModel>('Admin', adminSchema);