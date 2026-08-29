import { z } from "zod";

export const plantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Plant name must contain at least 3 characters.")
    .max(40, "Plant name must be 40 characters or fewer.")
    .refine((name) => /[a-z]/i.test(name), "Plant name must include a letter."),
  type: z.enum(["Foreground", "Midground", "Background"], {
    error: "Choose where the plant will be placed.",
  }),
  quantity: z
    .number("Quantity is required.")
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(20, "Quantity cannot be more than 20."),
});

export type PlantFormValues = z.infer<typeof plantSchema>;
