import { drive, FOLDER_ID } from "../config/GDrive.js";
import fs from 'fs'
import { stage_observations, stagiaire_status } from "../utils/Observations.js";
import prismaClient from "./prismaClient.js";
import { validate } from "node-cron";

const prisma = prismaClient;

export const getAllStages = async (req, res) => {
    try {
        const stages = await prisma.stages.findMany({
            include: {
                unite:{
                    include:{
                        users:true
                    }
                },
                stagiaire: true,
                attestation: true,
                performance: true,
                taches: true,
                offre: true,
            },


        });

        res.status(200).send(stages);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const createStageFromInterview = async (req, res) => {
    const { interview_id, ...stages_data } = req.body;
    try {
        const stage = await prisma.stages.create({
            data: { ...stages_data, isNew: true },
            include: {
                stagiaire: true,
                unite: {
                    include: {
                        users: true,
                    },
                },
                attestation: true,
                performance: true,
                taches: true,
                offre: true,
            },
        });

        if (stage) {
            req.io.emit("new_stage", stage);
            const entretiens = await prisma.entretients.delete({
                where: { id: Number(interview_id) },
            });

            if (entretiens) {
                req.io.emit("deleted_entretient", Number(interview_id));
                const stagiaire = await prisma.stagiaires.update({
                    where: { id: Number(stages_data.stagiaire_id) },
                    data: { observation: stagiaire_status.en_stage },
                    include: {
                        entretiens: true,
                        stages: true,
                    },
                });
                if (stagiaire) {
                    req.io.emit("update_stagiaire", stagiaire);
                }
            }
            return res.status(200).send({ message: "Action reussite !!" });
        }

        return res
            .status(400)
            .send({ message: "Erreur au niveau du resrveur !!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export const newStage = async (req, res) => {
    const stages_data = req.body;
    try {
        const stage = await prisma.stages.create({
            data: stages_data,
        });
        res.status(200).send({ data: stage });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const partialUpdateStage = async (req, res) => {
    const { id } = req.params;
    const updated_stage_data = req.body;
    try {
        const stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: updated_stage_data,
        });

        res.status(200).send({ data: stage });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const deleteStage = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.stages.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({ message: "Element supprimé avec succes" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const abandon = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const stage = await prisma.stages.update({
            where: { id: Number(id) },
            data: {
                status: true,
                observation: stage_observations.abandon,
            },
            include: {
                unite:{
                    include:{
                        users:true
                    }
                },
                stagiaire: true,
                attestation: true,
                performance: true,
                taches: true,
                offre: true,
            },
        });

        if (stage) {
            req.io.emit("updated_stage", stage);

            const offre = await prisma.offres.update({
                where: { id: Number(stage.offre_id) },
                data: {
                    isDispo: true,
                    nombre_stagiaire:{increment:1}
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

            const stagiaire = await prisma.stagiaires.update({
                where: { id: Number(stage.stagiaire_id) },
                data: {
                    observation: stagiaire_status.postulant,
                },
                include: {
                    entretiens: true,
                    stages: true,
                },
            });

            if(stagiaire){
                req.io.emit("update_stagiaire" , stagiaire)
            }

            res.status(200).send({message:"Action reussite !!!"})
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const finished = async (req,res) =>{
    const { id } = req.params;
    
    try {
        const performanceData = JSON.parse(req.body.performance);

        const existingStage = await prisma.stages.findUnique({
            where: { id: Number(id) },
        });

        if (!existingStage) {
            return res.status(404).send({ message: "Stage non existant" });
        }

        const bookFile = req.files?.book?.[0];
        if (!bookFile) {
            return res.status(400).send({ message: "Veuillez insérer le fichier" });
        }

        let book_link = null;
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: bookFile.originalname,
                    mimeType: bookFile.mimetype,
                    parents: [FOLDER_ID],
                },
                media: {
                    mimeType: bookFile.mimetype,
                    body: fs.createReadStream(bookFile.path),
                },
            });

            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            book_link = `https://drive.google.com/file/d/${response.data.id}/view`;

            fs.unlink(bookFile.path, (err) => {
                if (err) console.error(`Error deleting file: ${err}`);
            });

        } catch (driveError) {
            console.error('Google Drive upload error:', driveError);
            return res.status(500).send({ 
                message: "Erreur lors de l'upload vers Google Drive",
                error: driveError.message 
            });
        }

        if (!book_link) {
            return res.status(500).send({ 
                message: "Échec de la génération du lien du fichier" 
            });
        }

        const result = await prisma.$transaction(async (prisma) => {
            // Update stage
            const finishedStage = await prisma.stages.update({
                where: { id: Number(id) },
                data: {
                    status: false,
                    observation: stage_observations.en_validation,
                    book_link: book_link,  // We know this exists now
                    isNew: true,
                },
                include: {
                    unite:{
                        include:{
                            users:true
                        }
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: true,
                    offre: true,
                },
            });

            const performance = await prisma.performances.create({
                data: { stage_id:Number(finishedStage.id) , ...performanceData },
                include:{stage:true}
            });

            return { finishedStage, performance };
        });

        // Emit socket event after successful transaction
        req.io.emit('updated_stage', result.finishedStage);
        if(result.performance.stage){
            req.io.emit('updated_stage', result.performance.stage);
        }
        req.io.emit('new_perf' , result.performance)

        return res.status(200).send({ 
            message: "Stage terminé avec succès",
            stage: result.finishedStage,
            performance: result.performance
        });

    } catch (error) {
        console.error('Error in finished stage:', error);
        return res.status(500).send({ 
            message: "Une erreur est survenue", 
            error: error.message 
        });
    }
};


export const revalid = async (req,res) =>{
    const { id } = req.params;
    
    try {
        const performanceData = JSON.parse(req.body.performance);
        const existingStage = await prisma.stages.findUnique({
            where: { id: Number(id) },
        });

        if (!existingStage) {
            return res.status(404).send({ message: "Stage non existant" });
        }

        const bookFile = req.files?.book?.[0];
        if (!bookFile) {
            return res.status(400).send({ message: "Veuillez insérer le fichier" });
        }

        let book_link = null;
        try {
            const response = await drive.files.create({
                requestBody: {
                    name: bookFile.originalname,
                    mimeType: bookFile.mimetype,
                    parents: [FOLDER_ID],
                },
                media: {
                    mimeType: bookFile.mimetype,
                    body: fs.createReadStream(bookFile.path),
                },
            });

            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });

            book_link = `https://drive.google.com/file/d/${response.data.id}/view`;

            fs.unlink(bookFile.path, (err) => {
                if (err) console.error(`Error deleting file: ${err}`);
            });

        } catch (driveError) {
            console.error('Google Drive upload error:', driveError);
            return res.status(500).send({ 
                message: "Erreur lors de l'upload vers Google Drive",
                error: driveError.message 
            });
        }

        if (!book_link) {
            return res.status(500).send({ 
                message: "Échec de la génération du lien du fichier" 
            });
        }

        const result = await prisma.$transaction(async (prisma) => {
            const finishedStage = await prisma.stages.update({
                where: { id: Number(id) },
                data: {
                    observation: stage_observations.en_validation,
                    book_link: book_link,  
                    isNew: true,
                },
                include: {
                    unite:{
                        include:{
                            users:true
                        }
                    },
                    stagiaire: true,
                    attestation: true,
                    performance: true,
                    taches: true,
                    offre: true,
                },
            });


            const performance = await prisma.performances.update({
                where: {id: Number(finishedStage.performance.id)},
                data: { ...performanceData },
                include:{stage:true}
            });

            return { finishedStage  ,performance};
        });

        req.io.emit('updated_stage', result.finishedStage);
        if(result.performance.stage){
            req.io.emit('updated_stage', result.performance.stage);
        }
        req.io.emit('updated_performance' , result.performance)

        return res.status(200).send({ 
            message: "Stage terminé avec succès",
            stage: result.finishedStage,
            performance: result.performance
        });

    } catch (error) {
        console.error('Error in finished stage:', error);
        return res.status(500).send({ 
            message: "Une erreur est survenue", 
            error: error.message 
        });
    }
};


export const invalid = async (req,res) =>{
    const {id} = req.params
    const data = req.body
    try {
        const stage = await prisma.stages.findUnique({
            where:{id:Number(id)},
        })

        if(!stage){
            res.status(404).send({message:"Stage non trouvé !"})
        }

        const book_link = stage.book_link || null
        if(book_link){
           try {
                const fileId = book_link.split('/d/')[1]?.split('/')[0]
                if(fileId){
                    await drive.files.delete({fileId})
                }
           } catch (error) {
                res.status(500).send(error)
           } 
        }

        const invalidstage = await prisma.stages.update({
            where:{id:Number(id)},
            data:{
                status:false,
                observation:stage_observations.re_valide,
                isNew:true,
                motif_revalidation:data.motif,
                book_link:null,
            },
            include: {
                unite:{
                    include:{
                        users:true
                    }
                },
                stagiaire: true,
                attestation: true,
                performance: true,
                taches: true,
                offre: true,
            },

        })

        if(invalidstage){
            req.io.emit('updated_stage' , invalidstage)
            return res.status(200).send({message:"Action reussite !"})
        }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}


export const valid = async (req,res) =>{
    const {id}=req.params
    const numero = req.body.numero
    try {
        const validated = await prisma.stages.update({
            where: {id:Number(id)},
            data:{isNew:true , status:true , observation:stage_observations.acheve},
            include: {
                unite:{
                    include:{
                        users:true
                    }
                },
                stagiaire: true,
                attestation: true,
                performance: true,
                taches: true,
                offre: true,
            },
        })
        if(validated){

            const stagiaire = await prisma.stagiaires.update({
                where:{id: Number(validated.stagiaire_id)},
                data:{observation: stagiaire_status.ancien},
                include: {
                    entretiens: true,
                    stages: true ,
                },
            })

            const attestation = await prisma.attestation.create({
                data:{
                    isNew:true,
                    status:true,
                    stage_id: Number(validated.id),
                    numero: numero ,
                },
                include: {
                    stage: {
                        include: {
                            stagiaire: true,
                            unite: {
                                include: {
                                    users: true,
                                },
                            },
                            attestation: true,
                            performance: true,
                            taches: true,
                            offre: true,
                        },
                    },
                },
            })
            
            if(attestation){
                if(attestation.stage){
                    req.io.emit("updated_stage" , attestation.stage)
                }
                req.io.emit("new_attestation" , attestation)
            }

            req.io.emit('update_stagiaire' , stagiaire)
            req.io.emit('updated_stage' , validated)
            return res.status(200).send({message:"Action reussite!"})
        }
    } catch (error) {
        res.status(500).send({message:error})
    }
}