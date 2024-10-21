import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllAttestation = async (req, res) => {
    try {
        const attestation = await prisma.attestation.findMany({
            include:{
                stage:{
                    include:{
                        stagiaire:true
                    }
                }
            }
        })

        res.status(200).send(attestation)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newAttestation = async (req, res) => {
    const attestation_data = req.body
    try {
        const attestation = await prisma.attestation.create({
            data: attestation_data
        })
        res.status(200).send({data: attestation})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateAttestation = async (req, res) => {
    const {id} = req.params
    const updated_attestation_data = req.body
    try {
        const attestation = await prisma.attestation.update({
            where:{id: Number(id)},
            data: updated_attestation_data
        })

        res.status(200).send({data: attestation})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteAttestation = async (req, res) => {
    const {id}= req.params
    try {
        await prisma.attestation.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element supprimé avec succes"})
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
