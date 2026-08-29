import { z } from "zod";

export const bettaSchema = z.object({
  name: z.string().trim().min(3, "Name must contain at least 3 characters.").max(40, "Name must be 40 characters or fewer."),
  strain: z.string().trim().min(3, "Strain must contain at least 3 characters."),
  gender: z.enum(["Male", "Female"], { error: "Choose a gender." }),
  age: z.number("Age is required.").int("Age must be a whole number.").min(1, "Age must be at least 1 month.").max(60, "Age cannot be more than 60 months."),
  price: z.number("Price is required.").positive("Price must be greater than zero."),
});

export type BettaFormValues = z.infer<typeof bettaSchema>;
