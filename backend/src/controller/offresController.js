import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllOffres = async (req, res) => {
    try {
        const offres = await prisma.offres.findMany({
            include:{unite:true}
        })

        res.status(200).send(offres)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newOffre = async (req, res) => {
    const offre_data = req.body
    try {
        const offre = await prisma.offres.create({
            data: offre_data
        })

        req.io.emit("new_offre" , offre)
        res.status(200).send({data: offre})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateOffre = async (req, res) => {
    const {id} = req.params
    const updated_offre_data = req.body
    try {
        const offre = await prisma.offres.update({
            where:{id: Number(id)},
            data: updated_offre_data
        })

        res.status(200).send({data: offre})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteOffre = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.offres.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
