import z from "zod"

// Schema for registering content
export const registerContentSchema = z.object({
    uniqueId: z
        .string({ message: "Please enter Unique Id" })
        .trim()
        .min(3, { message: "Unique Id must be at least 3 character long" }),
    title: z
        .string({ message: "Please enter Title" })
        .trim()
        .min(5, { message: "Title must be at least 5 characters long" })
        .max(100, { message: "Title must be no more than 100 characters" }),
    content: z
        .string({ message: "Please enter Content" })
        .trim()
        .min(10, { message: "Content must be at least 10 characters long" }),
    url: z
        .string({ message: "Please enter URL" })
        .trim()
        .url({ message: "Please enter a valid URL" })
        .max(100, { message: "URL must be no more than 100 characters" }),
    tagId: z
        .number({ message: "Tag ID must be a number" })
        .int({ message: "Tag ID must be an integer" })
        .positive({ message: "Tag ID must be positive" }),
    linkId: z
        .number({ message: "Link ID must be a number" })
        .int({ message: "Link ID must be an integer" })
        .positive({ message: "Link ID must be positive" })
        .optional()
})

// Schema for validating authenticated requests
export const authenticatedRequestSchema = z.object({
    uniqueId: z
        .string({ message: "User unique ID is required" })
        .trim()
        .min(1, { message: "User unique ID cannot be empty" })
})

// Schema for updating content
export const updateContentSchema = z.object({
    title: z
        .string({ message: "Title must be a string" })
        .trim()
        .min(1, { message: "Title must be at least 1 character long" })
        .max(100, { message: "Title must be no more than 100 characters" })
        .optional(),
    content: z
        .string({ message: "Content must be a string" })
        .trim()
        .min(1, { message: "Content must be at least 1 character long" })
        .optional(),
    url: z
        .string({ message: "URL must be a string" })
        .trim()
        .url({ message: "Please enter a valid URL" })
        .max(100, { message: "URL must be no more than 100 characters" })
        .optional(),
    tagId: z
        .number({ message: "Tag ID must be a number" })
        .int({ message: "Tag ID must be an integer" })
        .positive({ message: "Tag ID must be positive" })
        .optional(),
    linkId: z
        .number({ message: "Link ID must be a number" })
        .int({ message: "Link ID must be an integer" })
        .positive({ message: "Link ID must be positive" })
        .nullable()
        .optional()
})

// Schema for validating ID parameters
export const idParamSchema = z.object({
    id: z
        .string({ message: "ID is required" })
        .regex(/^\d+$/, { message: "ID must be a valid number" })
})

// Schema for validating query parameters for getAllContentsByRangeAndTag
export const contentQuerySchema = z.object({
    tagId: z
        .string({ message: "Tag ID is required" })
        .regex(/^\d+$/, { message: "Tag ID must be a valid number" }),
    page: z
        .string({ message: "Page is required" })
        .regex(/^\d+$/, { message: "Page must be a valid number" })
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 1, { message: "Page must be >= 1" }),
    limit: z
        .string({ message: "Limit is required" })
        .regex(/^\d+$/, { message: "Limit must be a valid number" })
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 1 && val <= 100, { message: "Limit must be between 1 and 100" })
})