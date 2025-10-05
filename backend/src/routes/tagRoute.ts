import { Router } from "express";
import { getAllTags } from "../controller";

const tagrouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TagResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *     TagSuccessResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TagResponse'
 *         message:
 *           type: string
 *         success:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management operations
 */

/**
 * @swagger
 * /get-all-tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Tags retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TagSuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 - id: 1
 *                   name: "YouTube"
 *                 - id: 2
 *                   name: "Article"
 *                 - id: 3
 *                   name: "Documentation"
 *               message: "Get All Tags"
 *               success: true
 */
tagrouter.route("/get-all-tags").get(getAllTags);

export default tagrouter;