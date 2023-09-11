import mongoose from 'mongoose'

const dbConnection = async () => {
  const uri = process.env.MONGODB_CNN

  if (!uri) {
    throw new Error('MONGODB_CNN environment variable is not defined.')
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('DB error')
  }
}

export default dbConnection
