import express from 'express'
import cors from 'cors'
import dbConnection from './database/config'
import users from './routes/admin'
import newsletter from './routes/newsletter'
import recipient from './routes/recipient'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

const paths = {
  users: '/api/user',
  newsletter: '/api/newsletter',
  recipient: '/api/recipient',
}

const connectDB = async () => {
  await dbConnection()
}

const middlewares = () => {
  app.use(cors())
  app.use(express.json())
}

const routes = () => {
  app.use(paths.users, users)
  app.use(paths.newsletter, newsletter)
  app.use(paths.recipient, recipient)
}

app.listen(port, () => {
  console.log('Server running on port', port)
})

connectDB()

middlewares()

routes()

export default app
