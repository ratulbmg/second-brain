import { Tag } from "@prisma/client";
import { BaseRepository } from "./baseRepository";
import prisma from "../lib/db";

class TagRepository extends BaseRepository<Tag> {
    constructor() {
        super(prisma.tag)
    }

    // Add any user-specific methods here

}

export { TagRepository }
