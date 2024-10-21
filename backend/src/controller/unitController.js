
import prismaClient from "./prismaClient.js";
const prisma = prismaClient

export const getAllUnit = async(req,res)=>{

    try {
        const unites = await prisma.unites.findMany({
            include: {sur_division:true}
        })
        
        res.status(200).send({data:unites})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const newUnit = async(req,res)=>{
    const {nom , isDivision , isBureau , isDependant , division_id} = req.body
    try {
        const unite = await prisma.unites.create({
            data:{nom , isDivision , isBureau,isDependant ,division_id},
        })
        res.status(200).send(unite)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const partialUpdateUnit = async (req,res)=>{
    const {id} = req.params
    const data = req.body
    try {
        const unite = await prisma.unites.update({
            where:{id: Number(id)},
            data: data
        })

        res.status(200).send({data:unite})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}


export const deleteUnit = async (req,res)=>{
    const {id} = req.params
    try {
        await prisma.unites.delete({
            where:{id: Number(id)}
        })
        res.status(200).send({message: "Element Supprimé avec succes"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}