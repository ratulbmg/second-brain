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
}

export { ContentRepository }
