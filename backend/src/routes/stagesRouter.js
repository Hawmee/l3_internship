import express from 'express'
import { deleteStage, getAllStages, newStage, partialUpdateStage } from '../controller/stagesController.js'


const router = express.Router()

router.get('/stage' , getAllStages )
router.post('/stage' , newStage)
router.patch('/stage/:id' , partialUpdateStage)
router.delete('/stage/:id' , deleteStage)

export default router 