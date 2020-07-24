import { PrismaClient } from '@prisma/client'
import { IRefreshLog } from '../model'

const prisma = new PrismaClient()

export class FeedRepository {
    async get(req: any) {
        this.save_refresh_log(req);
        const result = await prisma.feeds.findMany({
            where: {
                published: true
            },
            select: {
                id: true,
                enqueued: true,
                ordinal: true,
                url: true,
                published: true,
                categories: {
                    select: {
                        id: true
                    }
                },
                credits: true,
                title: true
            },
            orderBy: {
                ordinal: 'desc'
            }
        })
        return result
    }

    async get_gt_ordinal(req: any) {
        this.save_refresh_log(req);
        const result = await prisma.feeds.findMany({
            where: {
                published: true,
                ordinal: {
                    gt: parseInt(req.params.ordinal)
                },
            },
            select: {
                id: true,
                enqueued: true,
                ordinal: true,
                url: true,
                published: true,
                categories: {
                    select: {
                        id: true
                    }
                },
                credits: true,
                title: true
            },
            orderBy: {
                ordinal: 'desc'
            }
        })
        return result
    }

    async save_refresh_log(req: any) {
        var refresh_log: IRefreshLog = {
            uuid: req.params.uuid,
            height: req.params.height,
            os: req.params.os
        }

        const result = await prisma.refresh_log.create({
            data: {
                uuid: req.params.uuid,
                height: Number(req.params.height),
                os: req.params.os
            },
        })
    }
}