import { Content } from "@prisma/client";
import { BaseRepository } from "./baseRepository";
import prisma from "../lib/db";

class ContentRepository extends BaseRepository<Content> {
    constructor() {
        super(prisma.content)
    }

    // Add any user-specific methods here

    // This method is used to find a single content by a condition
    async findContent(where: Partial<Content>): Promise<Content | null> {
        return prisma.content.findFirst({ where })
    }

    // This method is used to delete a content by id and user id
    async deleteContent(id: number, userId: number): Promise<Content | null> {
        return prisma.content.delete({ where: { id, userId } })
    }

    // This method is used to get the total links by tag id and by user
    async getTotalLinksCountByTagIdAndByUser(userId: number, tagId: number): Promise<number> {
        return prisma.content.count({ where: { tagId , userId }})
    }

    // This method is used to get the total links count by user
    async getTotalLinksCountByUser(userId: number,): Promise<number> {
        return prisma.content.count({ where: { userId }})
    }

    // Pagination method for getting content with offset and limit
    async getContentWithPagination(userId: number, tagId?: number, offset: number = 0, limit: number = 10): Promise<Content[]> {
        const where = tagId && tagId > 0 ? { tagId, userId: userId } : {};

        return prisma.content.findMany({
            where,
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc' // or { id: 'asc' } based on your preference
            }
        });
    }
}

export { ContentRepository }
