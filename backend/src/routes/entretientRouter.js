import express from 'express'
import { deleteEntretient, getAllEntretient, newEntretient, newEntretientStagiaire, partialUpdateEntretient } from '../controller/entretientController.js'
import upload from '../config/multerConfig.js'


const router = express.Router()


router.get('/entretient' , getAllEntretient )
router.post('/entretient' ,newEntretient)
router.post('/entretientStagiaire' , upload.fields([{name:'cv_link'},{name:'lm_link'}]),newEntretientStagiaire)
router.patch('/entretient/:id' , partialUpdateEntretient)
router.delete('/entretient/:id' , deleteEntretient)

export default router 