import {Router} from 'express'
import {getAllNewsletter, sendNewsletter} from '../controllers/newsletter'
import {verifyToken} from '../middlewares/verifyToken'

const router = Router()

router.get('/', verifyToken, getAllNewsletter)
router.post('/send', verifyToken, sendNewsletter)

export default router
