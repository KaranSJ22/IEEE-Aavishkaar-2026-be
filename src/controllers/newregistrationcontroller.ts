import type { Request, Response } from "express";
import {registrationSchema} from "../schemas/registration.schema";
import { RegistrationModel } from "../models/Registration";
import { sendWelcomeEmail } from "./mailer";
export async function newregistrationcontroller(req: Request, res: Response) {
    try {
        console.log("🔥 CONTROLLER HIT");
        console.log("Request body:", req.body);
        
        const parsed = await registrationSchema.parseAsync(req.body);
        console.log("Parsed registration data:", parsed);
        parsed.leadEmail = parsed.leadEmail.toLowerCase();
        
        const registration = new RegistrationModel(parsed);
        await registration.save();

        let val=sendWelcomeEmail(parsed);
        if(val==null){
            res.status(400).json("Couldn't send email");
        }
        console.log("Registration saved:", registration);  
        res.status(201).json({ message: "Registration created", registration });
    } catch (err) {
        console.error("Error in newregistrationcontroller:", err);
        res.status(400).json({ error: (err as Error).message });
    }
}