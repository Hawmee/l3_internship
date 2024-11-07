import express from 'express'
import { abandon, createStageFromInterview, deleteStage, finished, getAllStages, invalid, newStage, partialUpdateStage, revalid, valid } from '../controller/stagesController.js'
import upload from '../config/multerConfig.js'


const router = express.Router()

router.get('/stage' , getAllStages )
router.post('/stage' , newStage),
router.patch('/stage/abandon/:id' , abandon)
router.patch('/stage/invalid/:id' , invalid)
router.patch('/stage/valid/:id' , valid)
router.patch('/stage/finish/:id' , upload.fields([{name:'book'}]) , finished)
router.patch('/stage/revalid/:id' , upload.fields([{name:'book'}]) , revalid)
router.post('/newStage' , createStageFromInterview)
router.patch('/stage/:id' , partialUpdateStage)
router.delete('/stage/:id' , deleteStage)

export default router   