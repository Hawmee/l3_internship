import express from "express";
import userRouter from './userRouter.js'
import authRouter from './Auth/authRouter.js'
import attestationRouter from './attestationRouter.js'
import entretientRouter from './entretientController.js'
import offresRouter from './offresRouter.js'
import perfRouter from './performanceRouter.js'
import stagesRouter from './stagesRouter.js'
import stagiaireRouter from './stagiaires.Router.js'
import tacheRouter from './tachesRouter.js'
import unitRouter from './unitRouter.js'


const router = express.Router()

router.use('/api' , userRouter)
router.use('/api' , authRouter)
router.use('/api' , attestationRouter)
router.use('/api' , entretientRouter)
router.use('/api' , offresRouter)
router.use('/api' , perfRouter)
router.use('/api' , stagesRouter)
router.use('/api' , stagiaireRouter)
router.use('/api' , tacheRouter)
router.use('/api' , unitRouter)


export default router