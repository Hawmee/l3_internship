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
                    livrables: true,
                    performance: true,
                    taches: true,
                    offre: true,
                },
            });

            req.io.emit("updated_stage", updatedStage);
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

        res.status(200).send({ data: tache });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

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
