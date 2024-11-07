import express from 'express'
import { informIntern } from '../controller/mailController.js'


const router = express.Router()


router.post('/informStagiaire' , informIntern )

export default router