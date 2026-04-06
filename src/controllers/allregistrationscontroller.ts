import type { Request, Response } from "express";
import { RegistrationModel } from "../models/Registration";

const allregistrationscontroller = async (req: Request, res: Response) => {
    try {
        const registrations = await RegistrationModel.find();
        console.log("Fetched registrations:", registrations);
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export default allregistrationscontroller;
