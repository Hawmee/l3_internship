import express from 'express'
import { deleteAttestation, getAllAttestation, newAttestation, partialUpdateAttestation, validate } from '../controller/attestationController.js'



const router = express.Router()

router.get('/attestation' , getAllAttestation )
router.post('/attestation' ,newAttestation)
router.patch('/attestation/:id' , partialUpdateAttestation)
router.patch('/attestation/validate/:id' , validate)
router.delete('/attestation/:id' , deleteAttestation)

export default router 