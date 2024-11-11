import express from 'express'
import { deleteTache, finished, getAllTache, newTache, partialUpdateTache, unfinished_tasks } from '../controller/tachesController.js'


const router = express.Router()

router.get('/tache' , getAllTache )
router.post('/tache' , newTache)
router.patch('/tache/:id' , partialUpdateTache)
router.delete('/tache/:id' , deleteTache)
router.patch('/tache/validate/:id' , finished)

router.patch('/taches/unfinished/' , unfinished_tasks)

export default router 