import fs from "fs";
import { drive, FOLDER_ID } from "../config/GDrive.js";
import { stagiaire_status } from "../utils/Observations.js";
import prismaClient from "./prismaClient.js";

const prisma = prismaClient;

export const getAllEntretient = async (req, res) => {
    try {
        const entretients = await prisma.entretients.findMany({
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true,
                    },
                },
            },
        });

        res.status(200).send(entretients);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const markViewed = async (req, res) => {
    try {
        const viewed = await prisma.entretients.updateMany({
            where: {
                isNew: true,
                date_interview: { not: null },
            },
            data: {
                isNew: false,
            },
        });

        if (viewed.count) {
            const viewed_items = await prisma.entretients.findMany({
                where: { isNew: false },
            });
            req.io.emit("updated_entretient", viewed_items);
        }
        res.status(200).send({
            message: "Records updated successfully",
            count: viewed.count,
        });
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

export const newEntretient = async (req, res) => {
    const entretient_data = req.body;
    try {
        const entretient = await prisma.entretients.create({
            data: entretient_data,
            include: {
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true
                    },
                },
            },
        });
        if (entretient) {
            const stagiaire = await prisma.stagiaires.update({
                where: {
                    id: entretient.stagiaire_id,
                },
                data: {
                    observation: stagiaire_status.a_entretenir,
                },
                include: {
                    entretiens: true,
                    stages: true,
                },
            });

            const offre = await prisma.offres.update({
                where: { id: Number(entretient.offre_id) },
                data: {
                    nombre_stagiaire: { decrement: 1 },
                },
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
                },
            });

            if (offre.nombre_stagiaire <= 0) {
                const offre = await prisma.offres.update({
                    where: { id: Number(entretient.offre_id) },
                    data: {
                        isDispo: false,
                    },
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
                    },
                });

                if (offre) {
                    req.io.emit("updated_offre", offre);
                }
            }

            if (stagiaire) {
                req.io.emit("update_stagiaire", stagiaire);
            }
            if (offre) {
                req.io.emit("updated_offre", offre);
            }
        }
        req.io.emit("new_entretient", entretient);
        res.status(200).send({ data: entretient });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const newEntretientStagiaire = async (req, res) => {
    const {
        nom,
        prenom,
        etablissement,
        email,
        phone,
        niveau,
        filiere,
        offre_id,
    } = req.body;
    try {
        const files = req.files;
        const fileLinks = [];
        const expectedFiles = ["cv_link", "lm_link"];

        for (const expectedFile of expectedFiles) {
            const file = files[expectedFile] ? files[expectedFile][0] : null;

            if (file) {
                const uniquefilename = `${Date.now()}--${file.originalname}`;
                const response = await drive.files.create({
                    requestBody: {
                        name: uniquefilename,
                        mimeType: file.mimetype,
                        parents: [FOLDER_ID],
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fs.ReadStream(file.path),
                    },
                });

                await drive.permissions.create({
                    fileId: response.data.id,
                    requestBody: {
                        role: "reader",
                        type: "anyone",
                    },
                });

                const fileId = response.data.id;
                const link = `https://drive.google.com/file/d/${fileId}/view`;
                fileLinks.push(link);

                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${err}`);
                    }
                });
            }
        }

        if (fileLinks.length > 0) {
            const stagiaire = await prisma.stagiaires.create({
                data: {
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    phone: phone,
                    niveau: niveau,
                    filiere: filiere,
                    etablissement: etablissement,
                    observation: "A entretenir",
                    cv_link: fileLinks[0] || null,
                    lm_link: fileLinks[1] || null,
                },
                include: {
                    entretiens: true,
                },
            });

            if (stagiaire) {
                req.io.emit("new_stagiaire", stagiaire);

                const entretient = await prisma.entretients.create({
                    data: {
                        stagiaire_id: stagiaire.id,
                        offre_id: Number(offre_id),
                    },
                    include: {
                        stagiaire: {
                            include: {
                                entretiens: true,
                                stages: true,
                            },
                        },
                        offre: {
                            include: {
                                unite: {
                                    include: {
                                        users: true,
                                    },
                                },
                                stages: true,
                                entretiens:true
                            },
                        },
                    },
                });

                if (entretient) {
                    const offre = await prisma.offres.update({
                        where: {
                            id: Number(offre_id),
                        },
                        data: {
                            nombre_stagiaire: { decrement: 1 },
                        },
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
                        },
                    });

                    if (offre.nombre_stagiaire <= 0) {
                        const offre = await prisma.offres.update({
                            where: { id: Number(entretient.offre_id) },
                            data: {
                                isDispo: false,
                            },
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
                            },
                        });
        
                        if (offre) {
                            req.io.emit("updated_offre", offre);
                        }
                    }



                    req.io.emit("updated_offre", offre);
                    req.io.emit("new_entretient", entretient);
                    return res.status(200).send(entretient);
                }
            }
        }
        return res
            .status(400)
            .send({ message: "Erreur lors de l'importation des fichiers" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const validateEntretient = async (req, res) => {
    const { id } = req.params;
    const updated_entretient_data = req.body;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                status: true,
                isNew: true,
            },
            include: {
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true,
                    },
                },
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });
        req.io.emit("updated_entretient", entretient);
        res.status(200).send(entretient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateEntretient = async (req, res) => {
    const { id } = req.params;
    const updated_entretient_data = req.body;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                ...updated_entretient_data,
                isInforme: false,
                isNew: true,
            },
            include: {
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true
                    },
                },
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });
        req.io.emit("updated_entretient", entretient);
        res.status(200).send(entretient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const AffirmEntretient = async (req, res) => {
    const { id } = req.params;
    const updated_entretient_data = req.body;
    try {
        const entretient = await prisma.entretients.update({
            where: { id: Number(id) },
            data: {
                isNew: true,
                ...updated_entretient_data,
            },
            include: {
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true
                    },
                },
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });
        req.io.emit("updated_entretient", entretient);
        res.status(200).send(entretient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const informedEntretien = async (req, res) => {
    const { id } = req.params;
    try {
        const informed = await prisma.entretients.update({
            where: { id: Number(id) },
            data: { isInforme: true, isNew: false },
            include: {
                offre: {
                    include: {
                        unite: {
                            include: {
                                users: true,
                            },
                        },
                        stages: true,
                        entretiens:true,
                    },
                },
                stagiaire: {
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                },
            },
        });

        if (informed) {
            req.io.emit("updated_entretient", informed);
            if (informed.offre) {
                req.io.emit("updated_offre", informed.offre);
            }
            res.status(200).send({ message: "Stagiaire Informé" });
        }
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

export const deleteEntretient = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.entretients.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const cancelEntretient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await prisma.entretients.delete({
            where: { id: Number(id) },
        });

        if (deleted) {
            const stagiaire = await prisma.stagiaires.update({
                where: { id: Number(deleted.stagiaire_id) },
                data: { observation: stagiaire_status.postulant },

                include: {
                    entretiens: true,
                    stages: true,
                },
            });

            const offre = await prisma.offres.update({
                where: { id: Number(deleted.offre_id) },
                data: { nombre_stagiaire: { increment: 1 }, isDispo: true },

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
                    stages: true,
                },
            });

            if (stagiaire) {
                req.io.emit("update_stagiaire", stagiaire);
            }

            if (offre) {
                req.io.emit("updated_offre", offre);
            }
            req.io.emit("deleted_entretient", id);
            res.status(200).send({ message: "Action reussite" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
