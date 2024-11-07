import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllOffres = async (req, res) => {
    try {
        const offres = await prisma.offres.findMany({
            include: {
                entretiens: {
                    include: {
                        stagiaire: true,
                    },
                },
                unite: {
                    include: {
                        users: true,
                    },
                },
                stages:true
            },
        });

        res.status(200).send(offres);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newOffre = async (req, res) => {
    const offre_data = req.body;
    try {
        const offre = await prisma.offres.create({
            data: offre_data,
            include: {
                entretiens: {
                    include: {
                        stagiaire: true,
                    },
                },
                unite: {
                    include: {
                        users: true,
                    },
                },
                stages:true
            },
        });

        req.io.emit("new_offre", offre);
        res.status(200).send({ data: offre });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateOffre = async (req, res) => {
    const { id } = req.params;
    const updated_offre_data = req.body;
    try {
        const offre = await prisma.offres.update({
            where: { id: Number(id) },
            data: updated_offre_data,
            include: {
                entretiens: {
                    include: {
                        stagiaire: true,
                        offre: true,
                    },
                },
                unite: {
                    include: {
                        users: true,
                    },
                },
                stages:true,
            },
        });

        if (offre.entretiens && offre.entretiens.length > 0) {
            // Get updated interviews with all related data
            const updatedEntretiens = await prisma.entretients.findMany({
                where: {
                    id: {
                        in: offre.entretiens.map((e) => e.id),
                    },
                },
                include: {
                    stagiaire: true,
                    offre: {
                        include: {
                            unite:{
                                include:{
                                    users:true
                                }
                            },
                            stages:true
                        },
                    },
                },
            });

            req.io.emit("updated_entretient", updatedEntretiens);
        }

        offre.stages.forEach((stage) => {
            const updated_stage = {
                ...stage,
                offre: offre,
            };
            req.io.emit("updated_stage", updated_stage);
        });

        req.io.emit("updated_offre", offre);
        res.status(200).send({ data: offre });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteOffre = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.offres.delete({
            where: { id: Number(id) },
        });

        req.io.emit("deleted_offre", id);
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
