import { z } from "zod";

export const tankSchema = z.object({
  size: z.string().trim().min(3, "Tank size must contain at least 3 characters.").max(40, "Tank size must be 40 characters or fewer."),
  waterType: z.enum(["Freshwater", "Saltwater"], { error: "Choose a water type." }),
  temperature: z.number("Temperature is required.").min(18, "Temperature must be at least 18°C.").max(32, "Temperature cannot be above 32°C."),
  hasFilter: z.boolean(),
});

export type TankFormValues = z.infer<typeof tankSchema>;
