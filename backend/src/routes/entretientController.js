import express from 'express'
import { deleteEntretient, getAllEntretient, newEntretient, partialUpdateEntretient } from '../controller/entretientController.js'


const router = express.Router()

router.get('/entretient' , getAllEntretient )
router.post('/entretient' ,newEntretient)
router.patch('/entretient/:id' , partialUpdateEntretient)
router.delete('/entretient/:id' , deleteEntretient)

export default router 