import {Router} from 'express'
import {
  addRecipient,
  listRecipients,
  unsubscribeRecipient,
} from '../controllers/recipient'
import {verifyToken} from '../middlewares/verifyToken'

const router = Router()

router.post('/', addRecipient)

router.get('/', verifyToken, listRecipients)

router.put('/unsubscribe/', unsubscribeRecipient)

export default router
