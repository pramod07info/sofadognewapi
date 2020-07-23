import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CategoryRepository{
    async post(req: any) {
        const result = await prisma.categories.create({
            data: {
              ...req.body,
            },
        })
        return result
    }

    async get(req: any) {
        const result = await prisma.categories.findMany({
            where:{
              is_active:true
            }, 
            select:{
              id:true,
              color:true,
              title:true
            }
        })
        return result
    }
}