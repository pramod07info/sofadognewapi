import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CategoryRepository {
	async post(req: any) {
		const result = await prisma.categories.create({
			data: {
				...req.body,
			},
		})
		return result
	}

	async get() {
		const result = await prisma.categories.findMany({
			where: {
				is_active: true
			},
			select: {
				ordinal: true,
				color: true,
				title: true
			},
			orderBy: {
				ordinal: 'asc'
			}
		})
		return result
	}
}