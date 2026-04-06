import type { Request,Response } from "express";
import { eventSchema } from "../schemas/event.schema";
import { EventModel } from "../models/Event";

export async function eventscontroller( req: Request, res: Response) {
    try {
        const parsed = await eventSchema.parseAsync(req.body);
        const event = new EventModel(parsed);
        await event.save();
        res.status(201).json({ message: "Event created", event });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
}
