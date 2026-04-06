import type { Request, Response } from "express";
import { EventModel } from "../models/Event";



export async function alleventscontroller( req: Request, res: Response) {
    try {
        const events = await EventModel.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}