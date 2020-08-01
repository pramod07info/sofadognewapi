import { PrismaClient, refresh_log } from '@prisma/client'
import { IRefreshLog } from '../model'

const prisma = new PrismaClient()

export class FeedRepository {
    async get(refrshLog: IRefreshLog) {
        this.save_refresh_log(refrshLog);
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

    async get_gt_ordinal(refreshLog: IRefreshLog) {
        this.save_refresh_log(refreshLog);
        const result = await prisma.feeds.findMany({
            where: {
                published: true,
                ordinal: {
                    gt: refreshLog.ordinal
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

    async save_refresh_log(refreshLog: IRefreshLog) {
        const result = await prisma.refresh_log.create({
            data: {
                uuid: refreshLog.uuid,
                height: Number(refreshLog.height),
                os: refreshLog.os
            },
        })
    }
}