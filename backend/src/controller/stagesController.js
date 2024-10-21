import prismaClient from "./prismaClient.js";

const prisma = prismaClient


export const getAllStages = async (req, res) => {
    try {
        const stages = await prisma.stages.findMany({
            include:{
                unite:true ,
                stagiaire:true ,
                attestation: true ,
                performance: true ,
                taches: true,
            }
        })

        res.status(200).send(stages)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newStage = async (req, res) => {
    const stages_data = req.body
    try {
        const stage = await prisma.stages.create({
            data: stages_data
        })
        res.status(200).send({data: stage})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateStage = async (req, res) => {
    const {id} = req.params
    const updated_stage_data = req.body
    try {
        const stage = await prisma.stages.update({
            where:{id: Number(id)},
            data: updated_stage_data
        })

        res.status(200).send({data: stage})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteStage = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.stages.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
