"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryWrapper = void 0;
const userRepository_1 = require("./userRepository");
class RepositoryWrapper {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
}
exports.repositoryWrapper = new RepositoryWrapper();
