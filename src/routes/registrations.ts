import { Router } from "express";
import { newregistrationcontroller } from "../controllers/newregistrationcontroller";
import  allregistrationscontroller  from "../controllers/allregistrationscontroller";
import  allregistrationsbyidcontroller  from "../controllers/allregistrationbyeventidcontroller";

const router = Router();



router.post("/newregistration", newregistrationcontroller);

router.get("/allregistrations", allregistrationscontroller);

router.get("/allregistrations/:eventId", allregistrationsbyidcontroller);

export const registrationRoute = router;