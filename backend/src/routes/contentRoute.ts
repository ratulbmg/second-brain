import { Router } from "express";
import { registerContent, getContentById, getAllContentsByRangeAndTag, deleteContent, updateContent } from "../controller";
import authenticateToken from "../middleware/authMiddleware";

const contentrouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - uniqueId
 *         - title
 *         - content
 *         - url
 *         - tagId
 *       properties:
 *         uniqueId:
 *           type: string
 *           minLength: 3
 *           description: Content's unique ID
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           description: Content title
 *         content:
 *           type: string
 *           minLength: 10
 *           description: Content body
 *         url:
 *           type: string
 *           format: url
 *           maxLength: 100
 *           description: Content URL
 *         tagId:
 *           type: integer
 *           minimum: 1
 *           description: Tag ID for categorization
 *         linkId:
 *           type: integer
 *           minimum: 1
 *           description: Optional link ID
 *     ContentUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         content:
 *           type: string
 *           minLength: 1
 *         url:
 *           type: string
 *           format: url
 *           maxLength: 100
 *         tagId:
 *           type: integer
 *           minimum: 1
 *         linkId:
 *           type: integer
 *           minimum: 1
 *           nullable: true
 *     ContentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         uniqueId:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         url:
 *           type: string
 *         userId:
 *           type: integer
 *         tag:
 *           type: string
 *         link:
 *           type: string
 *           nullable: true
 *     ContentListResponse:
 *       type: object
 *       properties:
 *         totalLinks:
 *           type: integer
 *         currentPage:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         itemsPerPage:
 *           type: integer
 *         hasNextPage:
 *           type: boolean
 *         hasPreviousPage:
 *           type: boolean
 *         contents:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContentResponse'
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/ContentResponse'
 *             - $ref: '#/components/schemas/ContentListResponse'
 *             - type: object
 *               properties:
 *                 message:
 *                   type: string
 *         message:
 *           type: string
 *         success:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management operations
 */

/**
 * @swagger
 * /register-content:
 *   post:
 *     summary: Register new content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *           example:
 *             uniqueId: "content_12345"
 *             title: "Introduction to React Hooks"
 *             content: "React Hooks are a powerful feature that allows you to use state and lifecycle features in functional components."
 *             url: "https://example.com/react-hooks-guide"
 *             tagId: 2
 *             linkId: 1
 *     responses:
 *       200:
 *         description: Content registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 id: 1
 *                 uniqueId: "content_12345"
 *                 title: "Introduction to React Hooks"
 *                 content: "React Hooks are a powerful feature..."
 *                 url: "https://example.com/react-hooks-guide"
 *                 userId: 1
 *                 tag: "Youtube"
 *                 link: "hashed_url_value"
 *               message: "Content Registration successfully"
 *               success: true
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Unique ID already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
contentrouter.post("/register-content", authenticateToken, registerContent);

/**
 * @swagger
 * /get-content-by-id/{id}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *         description: Content ID
 *         example: "1"
 *     responses:
 *       200:
 *         description: Content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 id: 1
 *                 uniqueId: "content_12345"
 *                 title: "Introduction to React Hooks"
 *                 content: "React Hooks are a powerful feature..."
 *                 url: "https://example.com/react-hooks-guide"
 *                 userId: 1
 *                 tag: "Youtube"
 *                 link: "hashed_url_value"
 *               message: "Get Content By Id"
 *               success: true
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Content not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
contentrouter.get("/get-content-by-id/:id", authenticateToken, getContentById);

/**
 * @swagger
 * /get-all-contents-by-range-and-tag:
 *   get:
 *     summary: Get all contents with pagination and filtering
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *         description: Tag ID for filtering (0 for all tags)
 *         example: "2"
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *           minimum: 1
 *         description: Page number
 *         example: "1"
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *           minimum: 1
 *           maximum: 100
 *         description: Items per page
 *         example: "10"
 *     responses:
 *       200:
 *         description: Contents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 totalLinks: 50
 *                 currentPage: 1
 *                 totalPages: 5
 *                 itemsPerPage: 10
 *                 hasNextPage: true
 *                 hasPreviousPage: false
 *                 contents:
 *                   - id: 1
 *                     uniqueId: "content_12345"
 *                     title: "Introduction to React Hooks"
 *                     content: "React Hooks are a powerful feature..."
 *                     url: "https://example.com/react-hooks-guide"
 *                     userId: 1
 *                     tag: "Youtube"
 *                     link: "hashed_url_value"
 *               message: "Get All Contents By Range And Tag"
 *               success: true
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
contentrouter.get("/get-all-contents-by-range-and-tag", authenticateToken, getAllContentsByRangeAndTag);

/**
 * @swagger
 * /delete-content/{id}:
 *   delete:
 *     summary: Delete content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *         description: Content ID to delete
 *         example: "1"
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 message: "Content deleted successfully"
 *               message: "Content Deleted"
 *               success: true
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Content not found or access denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
contentrouter.delete("/delete-content/:id", authenticateToken, deleteContent);

/**
 * @swagger
 * /update-content/{id}:
 *   put:
 *     summary: Update content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9]+$'
 *         description: Content ID to update
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContentUpdate'
 *           example:
 *             title: "Updated React Hooks Guide"
 *             content: "Updated content about React Hooks with latest features."
 *             url: "https://example.com/updated-react-hooks-guide"
 *             tagId: 3
 *             linkId: null
 *     responses:
 *       200:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 id: 1
 *                 uniqueId: "content_12345"
 *                 title: "Updated React Hooks Guide"
 *                 content: "Updated content about React Hooks..."
 *                 url: "https://example.com/updated-react-hooks-guide"
 *                 userId: 1
 *                 tag: "Docs"
 *                 link: null
 *               message: "Content Update successfully"
 *               success: true
 *       400:
 *         description: Invalid ID format or validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Content not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
contentrouter.put("/update-content/:id", authenticateToken, updateContent);

export default contentrouter;