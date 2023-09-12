import {Request, Response} from 'express'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'

export const loginAdmin = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {username, password} = req.body

  try {
    const admin = await Admin.findOne({username})

    if (!admin) {
      return res.status(401).json({message: 'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({message: 'Invalid credentials'})
    }

    if (!process.env.SECRET_KEY_JWT) {
      return res.status(400).json({message: 'Secret Key is missing'})
    }
    const token = jwt.sign({adminId: admin._id}, process.env.SECRET_KEY_JWT, {
      expiresIn: '1h',
    })

    return res.status(200).json({token})
  } catch (error) {
    return res.status(500).json({message: 'Server Error'})
  }
}
