import { z } from "zod";
import { RegistrationModel } from "../models/Registration";
export const registrationSchema = z.object({

  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Event ID format"),
  teamName: z.string(),

  leadName: z.string(),

  leadEmail: z.string().email(),

  leadPhone: z.string(),

  leadUSN: z.string(),

  teamMembers: z
    .array(
      z.object({
        name: z.string(),
        usn: z.string().optional(),
      })
    )
    .nullable(),

  registeredAt: z.coerce.date().optional(),
}).refine(async (data) => {
  if (!/^[0-9a-fA-F]{24}$/.test(data.eventId)) return true;
  const existingUser = await RegistrationModel.findOne({ leadEmail: data.leadEmail, eventId: data.eventId });
  return !existingUser;
}, {
  message: "You have already registered for this event",
  path: ["leadEmail"],
});

// Type for TypeScript (VERY USEFUL)
export type RegistrationType = z.infer<typeof registrationSchema>;