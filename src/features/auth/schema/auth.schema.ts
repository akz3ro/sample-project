import * as z from "zod";

export const loginSchema = z.object({
	email: z.string().email({ message: "Please enter email admin@akzero.com" }),
	password: z.string().min(5, { message: "Please enter password admin" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
