import type { Request, Response } from "express";
import { RegistrationModel } from "../models/Registration";
import { z } from "zod";
const paramsSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Event ID format"),
});
const allregistrationsbyidcontroller = async (req: Request, res: Response) => {
try {
        const parsed = await paramsSchema.safeParseAsync(req.params);

        if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.format(),
            });
        }

        const { eventId } = parsed.data;

        // Fetch using Mongoose model directly!
        const registrations = await RegistrationModel.find({ eventId });

        return res.status(200).json({
            success: true,
            data: registrations,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching registrations",
            error: (error as Error).message,
        });
    }
}
export default allregistrationsbyidcontroller;
