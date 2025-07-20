"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryWrapper = void 0;
const client_1 = require("@prisma/client");
const userRepository_1 = require("./userRepository");
const prisma = new client_1.PrismaClient();
class RepositoryWrapper {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
}
exports.repositoryWrapper = new RepositoryWrapper();
