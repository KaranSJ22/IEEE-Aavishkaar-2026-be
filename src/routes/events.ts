import { Router } from "express";
import { eventscontroller } from "../controllers/eventscontroller";
import { alleventscontroller } from "../controllers/alleventscontroller";

const router = Router();

router.post("/createevent", eventscontroller);
router.get("/allevents", alleventscontroller);
    

export const eventRoute = router;
