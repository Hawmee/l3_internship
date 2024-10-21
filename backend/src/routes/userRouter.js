import express from 'express'
import {  deleteUser, getAllUser, newUser, partialUpdateUser } from "../controller/userControllers.js"


const router = express.Router()

router.get('/users' , getAllUser )
router.post('/users' ,newUser)
router.patch('/user/:id' , partialUpdateUser)
router.delete('/user/:id' , deleteUser)

export default router 