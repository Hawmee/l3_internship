import express from 'express'
import { AffirmEntretient, cancelEntretient, deleteEntretient, getAllEntretient, informedEntretien, markViewed, newEntretient, newEntretientStagiaire, partialUpdateEntretient, validateEntretient } from '../controller/entretientController.js'
import upload from '../config/multerConfig.js'


const router = express.Router()


router.get('/entretient' , getAllEntretient )
router.post('/entretient' ,newEntretient)
router.post('/entretientStagiaire' , upload.fields([{name:'cv_link'},{name:'lm_link'}]),newEntretientStagiaire)
router.patch('/entretient/affirm/:id' , AffirmEntretient)
router.patch('/entretient/validate/:id' , validateEntretient)
router.patch('/entretient/:id' , partialUpdateEntretient)
router.patch('/informed/:id' , informedEntretien)
router.patch('/markviewed/entretient' , markViewed)
router.delete('/entretient/:id' , deleteEntretient)
router.delete('/enretient/cancel/:id' , cancelEntretient)

export default router 