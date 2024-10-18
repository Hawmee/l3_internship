import express from "express";
import userRouter from './userRouter.js'
import authRouter from './Auth/authRouter.js'


const router = express.Router()

router.use('/api' , userRouter)
router.use('/api' , authRouter)



export default router