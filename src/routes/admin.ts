import {Router} from 'express'
import {loginAdmin} from '../controllers/admin'
import { body } from 'express-validator';

const router = Router()

router.post(
  '/',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginAdmin,
)

export default router
