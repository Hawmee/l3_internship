import express from 'express'
import { deleteTache, getAllTache, newTache, partialUpdateTache } from '../controller/tachesController.js'


const router = express.Router()

router.get('/tache' , getAllTache )
router.post('/tache' , newTache)
router.patch('/tache/:id' , partialUpdateTache)
router.delete('/tache/:id' , deleteTache)

export default router 