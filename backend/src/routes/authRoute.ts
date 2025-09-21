import { Router } from "express";
import { registerUser, loginUser, meAccount } from "../controller";

const authrouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 320
 *           description: User's email address
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *           description: User's password
 *     UserResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *         data:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             token:
 *               type: string
 *         message:
 *           type: string
 *         success:
 *           type: boolean
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 320
 *         password:
 *           type: string
 *           minLength: 3
 *           maxLength: 255
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         errors:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 name: "John Doe"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               message: "User Registration successfully"
 *               success: true
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 400
 *               data:
 *                 message: "Validation failed"
 *                 errors: "Name must be at least 3 characters long."
 *               message: "null"
 *               success: flase
 *       409:
 *         description: User with email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 409
 *               data:
 *                 message: "User with email already exists"
 *                 errors: null
 *               message: "null"
 *               success: flase
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               data:
 *                 message: "Internal Server Error"
 *                 errors: "Error message"
 *               message: "null"
 *               success: flase
 */
authrouter.route("/register").post(registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "john@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               statusCode: 200
 *               data:
 *                 name: "John Doe"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               message: "User Login successfully"
 *               success: true
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 400
 *               data:
 *                 message: "Validation failed"
 *                 errors: "Please enter a valid email address"
 *               message: "null"
 *               success: flase
 *       401:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 401
 *               data:
 *                 message: "Unauthorized user"
 *                 errors: null
 *               message: "null"
 *               success: flase
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               data:
 *                 message: "Internal Server Error"
 *                 errors: "Error message"
 *               message: "null"
 *               success: flase
 */
authrouter.route("/login").post(loginUser);
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     emailVerified:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authrouter.route("/me").get(meAccount)

export default authrouter;