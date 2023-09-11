import {NextFunction, Response, Request} from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
interface IGetUserAuthRequest extends Request {
  user?: JwtPayload | string | undefined
}
export const verifyToken = (
  req: IGetUserAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('x-auth-token')

  if (!process.env.SECRET_KEY_JWT) {
    return res.status(400).json({message: 'Secret Key is missing.'})
  }
  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided'})
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({message: 'Invalid token'})
  }
}
