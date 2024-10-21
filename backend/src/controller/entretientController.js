import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllEntretient = async (req, res) => {
    try {
        const entretients = await prisma.entretients.findMany({
            include:{
                stagiaire: true ,
                offre: true
            }
        })

        res.status(200).send(entretients)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newEntretient = async (req, res) => {
    const entretient_data = req.body
    try {
        const entretient = await prisma.entretients.create({
            data: entretient_data
        })
        res.status(200).send({data: entretient})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateEntretient= async (req, res) => {
    const {id} = req.params
    const updated_entretient_data = req.body
    try {
        const entretient = await prisma.entretients.update({
            where:{id: Number(id)},
            data: updated_entretient_data
        })

        res.status(200).send({data: entretient})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteEntretient = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.entretients.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
