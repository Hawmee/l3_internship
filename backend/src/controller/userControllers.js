import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            include:{unite:true}
        })

        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newUser = async (req, res) => {
    const user_data = req.body
    try {
        const user = await prisma.users.create({
            data: user_data
        })
        res.status(200).send({data: user})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateUser = async (req, res) => {
    const {id} = req.params
    const updated_user_data = req.body
    try {
        const user = await prisma.users.update({
            where:{id: Number(id)},
            data: updated_user_data
        })

        res.status(200).send({data: user})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.users.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
