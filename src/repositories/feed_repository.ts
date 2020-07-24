import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class FeedRepository{
    async get(req: any) {
        const result = await prisma.feeds.findMany({
            where:{
                published:true
            },
            select:{
                id:true,
                enqueued:true,
                ordinal:true,
                url:true,
                published:true,
                categories:{
                    select:{
                        id:true
                    }
                },
                credits:true,
                title:true
            },
            orderBy:{
                ordinal:'desc'
            } 
        })
        return result
    }

    async get_gt_ordinal(req: any) {
        const result = await prisma.feeds.findMany({
            where:{
                published:true,
                ordinal:{
                    gt: parseInt(req.params.ordinal)
                },
            },
            select:{
                id:true,
                enqueued:true,
                ordinal:true,
                url:true,
                published:true,
                categories:{
                    select:{
                        id:true
                    }
                },
                credits:true,
                title:true
            },
            orderBy:{
                ordinal:'desc'
            }  
        })
        return result
    }
}