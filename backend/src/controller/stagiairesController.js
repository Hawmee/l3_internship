import prismaClient from "./prismaClient.js";

const prisma = prismaClient


export const getAllStagiaire = async(req,res) => {
    try {
        const stagiaires = await prisma.stagiaires.findMany()
        res.status(200).send(stagiaires)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


export const newStagiaire = async(req,res) => {
    const stagiaire_data = req.body
    try {
        const stagiaire = await prisma.stagiaires.create({
            data:stagiaire_data,
        })

        res.status(200).send({data:stagiaire , message:"Stagiaire ajouté avec success !"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}



export const partialUpdateStagiaire = async(req,res) => {
    const {id} = req.params
    const updated_stagiaire_data = req.body
    try {
        const stagiaire = await prisma.stagiaires.update({
            where:{id: Number(id)},
            data:{updated_stagiaire_data}
        })

        res.status(200).send({data:stagiaire , message:"Stagiaire modifié avec success !"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


export const deleteStagiaire = async(req,res) => {
    const {id}=req.params
    try {
        await prisma.stagiaires.delete({
            where:{id: Number(id)}
        })

        res.status(200).send({message: "Stagiaire Supprimé avec success"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}