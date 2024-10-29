import { connect } from "http2";
import { drive, FOLDER_ID } from "../config/GDrive.js";
import prismaClient from "./prismaClient.js";
import fs from 'fs'

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


export const newEntretientStagiaire = async (req, res)=>{
    const {nom,prenom,etablissement,email , phone , niveau , filiere , offre_id} = req.body
    try {
        const files = req.files
        const fileLinks= []
        const expectedFiles = ['cv_link', 'lm_link'];

        for(const expectedFile  of expectedFiles){
            const file = files[expectedFile] ? files[expectedFile][0] : null;

            if(file){
                const uniquefilename = `${Date.now()}--${file.originalname}`
                const response = await drive.files.create({
                    requestBody:{
                        name: uniquefilename,
                        mimeType:file.mimetype,
                        parents:[FOLDER_ID],
                    },
                    media:{
                        mimeType:file.mimetype,
                        body: fs.ReadStream(file.path) ,
                    }
                })

                await drive.permissions.create({
                    fileId: response.data.id,
                    requestBody: {
                        role: "reader",
                        type: "anyone"
                    }
                })

                const fileId = response.data.id
                const link=`https://drive.google.com/file/d/${fileId}/view`
                fileLinks.push(link)
            }
        }

        if(fileLinks.length>0){
            const stagiaire = await prisma.stagiaires.create({
                data:{
                    nom:nom,
                    prenom:prenom,
                    email:email,
                    phone:phone,
                    niveau:niveau,
                    filiere:filiere,
                    etablissement:etablissement,
                    observation: "A entretenir",
                    cv_link: fileLinks[0] || null,
                    lm_link:fileLinks[1] || null,
                },
            })

            if(stagiaire){
                req.io.emit("new_stagiaire" , stagiaire)

                const entretient = await prisma.entretients.create({
                    data:{
                        stagiaire_id:stagiaire.id,
                        offre_id:Number(offre_id),
                    },
                    include:{
                        stagiaire:true,
                        offre:true
                    }
                })

                if(entretient){
                    const offre = await prisma.offres.update({
                        where:{
                            id:Number(offre_id)
                        },
                        data:{
                            status: false
                        }
                    })

                    req.io.emit("updated_offre" , offre)
                    req.io.emit("new_entretient" , entretient)
                    return res.status(200).send(entretient)
                }
            }
        }
        return res.status(400).send({message:"Erreur lors de l'importation des fichiers"})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

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
