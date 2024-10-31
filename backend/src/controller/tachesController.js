import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllTache = async (req, res) => {
    try {
        const taches = await prisma.taches.findMany({
            include:{
                stage:{
                    include:{
                        stagiaire:{
                            include:{
                                entretiens:true ,
                                stages:true,
                            }
                        }
                    }
                }
            }
        })

        res.status(200).send(taches)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newTache = async (req, res) => {
    const tache_data = req.body
    try {
        const tache = await prisma.taches.create({
            data: tache_data
        })
        res.status(200).send({data: tache})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateTache = async (req, res) => {
    const {id} = req.params
    const updated_tache_data = req.body
    try {
        const tache = await prisma.taches.update({
            where:{id: Number(id)},
            data: updated_tache_data
        })

        res.status(200).send({data: tache})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteTache = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.taches.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
