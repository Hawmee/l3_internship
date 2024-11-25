import nodemailer from 'nodemailer'
import prismaClient from './prismaClient.js'
import { transporter } from '../config/mailConfig.js'

const prisma = prismaClient

export const informIntern = async(req,res)=>{
    const datas = req.body
    try {

        const mail_option ={
            to: datas.receiver_mail,
            subject: "Entretient de stage,",
            text:datas.content
        }
        const sent = await transporter.sendMail(mail_option)
        if(sent){
            const entretien = await prisma.entretients.update({
                where:{id:Number(datas.interview_id)},
                data:{isInforme:true},                
            })

            if(entretien){
                const updatedEntretien = await prisma.entretients.findUnique({
                    where: { id: Number(datas.interview_id) },
                    include: {
                        stagiaire: {
                            include: {
                                entretiens: true,
                                stages: true
                            }
                        }
                    }
                });

                req.io.emit("updated_entretient" , updatedEntretien)
                    
            }

            return res.status(200).send({message:"Mail envoyé qvec succes"})
        }
        return res.status(400).send({message:"Mail non envoyé"})

    } catch (error) {
        res.status(500).send({message: error})
    }
}


export const informFinalisation = async(req,res)=>{
    const datas = req.body
    try {

        const mail_option ={
            to: datas.receiver_mail,
            subject: " Finalisation de Stage ,",
            text:datas.content
        }
        const sent = await transporter.sendMail(mail_option)
        return res.status(200).send({message: sent})

    } catch (error) {
        res.status(500).send({message: error})
    }
}