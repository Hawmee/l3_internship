import express from 'express'
import { deleteOffre, getAllOffres, newOffre, partialUpdateOffre } from '../controller/offresController.js'


const router = express.Router()

router.get('/offre' , getAllOffres )
router.post('/offre' ,newOffre)
router.patch('/offre/:id' , partialUpdateOffre)
router.delete('/offre/:id' , deleteOffre)

export default router 