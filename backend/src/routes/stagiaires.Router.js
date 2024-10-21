import express from 'express'
import { deleteStagiaire, getAllStagiaire, newStagiaire, partialUpdateStagiaire } from '../controller/stagiairesController.js'


const router = express.Router()

router.get('/stagiaire' , getAllStagiaire )
router.post('/stagiaire' , newStagiaire)
router.patch('/stagiaire/:id' , partialUpdateStagiaire)
router.delete('/stagiaire/:id' , deleteStagiaire)

export default router 