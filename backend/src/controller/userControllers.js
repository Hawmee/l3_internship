// import { PrismaClient } from "@prisma/client"
import prismaClient from "./prismaClient.js"
const prisma = prismaClient


 export const getUsers = async() => {
    const users = await prisma.users.findMany({
        include : {unit:true}
    })
 }

 export const createUser = async(req ,res)=> {
    const {name , lastname , isChefService , isChefUnit , isPersCellule , isPersSecretariat ,unit_id } = req.body
    const newUser = await prisma.users.create({
        data:{name , lastname , isChefService , isChefUnit , isPersCellule , isPersSecretariat ,unit_id  }
    })

    res.json(newUser);
 }