import prismaClient from "./prismaClient.js";
import { message } from "../utils/message.js";
import { drive, FOLDER_ID } from "../config/GDrive.js";
import fs from 'fs'

const prisma = prismaClient;


export const get = async (req,res)=>{
    try {
        const demande = await prisma.demande.findMany()
        res.status(200).send(demande)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const create = async (req,res)=>{
    const demande_data = JSON.parse(req.body.demande_data);
    let fileLinks = { cv_link: null, lm_link: null };
    try {
        const files = req.files;
        const expectedFiles = ["cv_link", "lm_link"];
        
        const uploadPromises = expectedFiles.map(async (expectedFile) => {
            const file = files[expectedFile] ? files[expectedFile][0] : null;
            
            if (file) {
                const uniqueFilename = `${Date.now()}--${file.originalname}`;
                try {
                    const response = await drive.files.create({
                        requestBody: {
                            name: uniqueFilename,
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
                        requestBody: { role: "reader", type: "anyone" },
                    });

                    const fileId = response.data.id;
                    fileLinks[expectedFile] = `https://drive.google.com/file/d/${fileId}/view`;

                    await fs.promises.unlink(file.path);
                    
                    return true;
                } catch (fileError) {
                    throw new Error(`Error uploading ${expectedFile}: ${fileError.message}`);
                }
            }
            return true; 
        });

        await Promise.all(uploadPromises);

        const demande = await prisma.demande.create({
            data:{
                cv_lien: fileLinks.cv_link,
                lm_lien: fileLinks.lm_link,
                ...demande_data
            }
        })
        
        req.io.emit('new_demande' , demande)
        res.status(200).send({message: "Action reussite"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const update = async (req,res)=>{
    try {
        const demande_data = req.body
        const {id}= req.params
        const demande = await prisma.demande.update({
            where:{
                id: Number(id)
            },
            data:{
                ...demande_data
            }
        })

        req.io.emit('updated_demande' , demande)
        res.status(200).send({message: 'Action Reussite !'})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

export const markAllViewed = async(req , res )=>{
    try {
        const demande = await prisma.demande.updateMany({
            where:{isNew:true},
            data:{isNew:false}
        })

        if(demande.count){
            const viewed_items = await prisma.demande.findMany({
                where:{isNew:false}
            })
            req.io.emit('updated_demande' , viewed_items)
            res.status(200).send({
                message:"Action reussite"
            })
        }
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const registered = async (req , res )=>{
    const {id} = req.params
    try {
        const registered = await prisma.demande.update({
            where:{id: Number(id)},
            data:{isRegistred:true}
        })

        req.io.emit('updated_demande' , registered)
        res.status(200).send({message: "Action reussite"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const deleteDemande = async (req,res)=>{
    try {
        const {id} = req.params
        
        const demande = await prisma.demande.findUnique({
            where:{id: Number(id)}
        })

        if(!demande){
            return res.status(404).send({message: message.non_trouve})
        }

        const fileLinks = [demande.cv_link, demande.lm_link].filter(Boolean);

        if (fileLinks.length > 0) {
            try {
                for (const link of fileLinks) {
                    const fileId = link.split('/d/')[1]?.split('/')[0];
                    if (fileId) {
                        await drive.files.delete({ fileId });
                    }
                }
            } catch (fileError) {
                console.warn("Failed to delete files from Google Drive:", fileError.message);
            }
        }

        await prisma.demande.delete({
            where:{id: Number(id)}
        })

        req.io.emit('del_demande' , Number(id))
        res.status(200).send({message: message.reussite})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}