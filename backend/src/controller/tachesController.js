import { task_observations } from "../utils/Observations.js";
import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllTache = async (req, res) => {
    try {
        const taches = await prisma.taches.findMany({
            include: {
                stage: true,
            },
        });

        res.status(200).send(taches);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newTache = async (req, res) => {
    const tache_data = req.body;
    try {
        const tache = await prisma.taches.create({
            data: {
                observation: task_observations.en_cours,
                ...tache_data,
            },
        });
        if (tache) {
            const updatedStage = await prisma.stages.findUnique({
                where: { id: tache.stage_id },
                include: {
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: {include:{
                        stage:true
                    }},
                    offre: true,
                },
            });

            req.io.emit("updated_stage", updatedStage);
            req.io.emit('new_tache' , tache)
        }
        res.status(200).send({ message: "Action reussite !" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateTache = async (req, res) => {
    const { id } = req.params;
    const updated_tache_data = req.body;
    try {
        const tache = await prisma.taches.update({
            where: { id: Number(id) },
            data: updated_tache_data,
        });
        
        if (tache) {
            const updatedStage = await prisma.stages.findUnique({
                where: { id: tache.stage_id },
                include: {
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: {include:{
                        stage:true
                    }},
                    offre: true,
                },
            });

            req.io.emit("updated_stage", updatedStage);
            req.io.emit('updated_tache' , tache)
        }
        res.status(200).send({ message: "Action reussite !" })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const finished = async (req, res) => {
    const { id } = req.params;
    try {

        const current_tache = await prisma.taches.findUnique({
            where:{id:Number(id)}
        });

        let newObservaition
        if(current_tache.observation == task_observations.en_cours){
            newObservaition = task_observations.acheve
        }else if(current_tache.observation == task_observations.inacheve){
            newObservaition = task_observations.retard
        }


        const tache= await prisma.taches.update({
            where:{id:Number(id)},
            data:{
                status:true,
                observation:newObservaition,
            }

        })
        
        if (tache) {
            const updatedStage = await prisma.stages.findUnique({
                where: { id: tache.stage_id },
                include: {
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: {include:{
                        stage:true
                    }},
                    offre: true,
                },
            });

            req.io.emit("updated_stage", updatedStage);
            req.io.emit('updated_tache' , tache)
        }
        res.status(200).send({ message: "Action reussite !" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};



export const unfinished_tasks = async(req,res)=>{
    try {
        const updated_tasks = await prisma.taches.updateMany({
            where:{
                status: false,
                date_fin:{lt:new Date()}
            },
            data:{
                status:true,
                observation: task_observations.inacheve
            },
        })


        const unfinished_tasks = await prisma.taches.findMany({
            where:{
                status: true,
                observation: task_observations.inacheve,
            },
            select:{
                stage_id:true
            },
            distinct:['stage_id']
        })


        for(const task of unfinished_tasks){
            const updated_stage = await prisma.stages.findUnique({
                where:{id: Number(task.stage_id)},
                include: {
                    unite: {
                        include: {
                            users: true,
                        },
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: {include:{
                        stage:true
                    }},
                    offre: true,
                },
            })

            req.io.emit('updated_stage' , updated_stage)
            req.io.emit('updated_tache' , updated_tasks)
        }
        res.status(200).send({message: 'Taches a jours'})
    } catch (error) {
        res.status(500).send({message:error})
    }
}

export const deleteTache = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.taches.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
