import prismaClient from "../controller/prismaClient";


const prisma = prismaClient


export const updateOffre = async()=>{
    const today = new Date()

    await prisma.offres.updateMany({
        where:{
            date_fin: {lt:today},
            isDispo:true ,
        },
        data:{isDispo:false}
    })
}