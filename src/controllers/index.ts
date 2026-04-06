import { Request, Response } from "express";
import { SampleController } from "./sample";
import { eventscontroller } from "./eventscontroller";
import { alleventscontroller } from "./alleventscontroller";
import {newregistrationcontroller} from "./newregistrationcontroller";
import allregistrationscontroller from "./allregistrationscontroller";
import allregistrationsbyidcontroller from "./allregistrationbyeventidcontroller";
import { mongodbClient } from "../db";


export class ControllerClass {
    constructor() {
        // do something
        mongodbClient.init();
    }

    async pingController(req: Request, res: Response) {
        return res.status(201).json({ message: "Server running" });
    }

    sampleController = SampleController;
    eventscontroller = eventscontroller;
    alleventscontroller = alleventscontroller;
    newregistrationcontroller = newregistrationcontroller;
    allregistrationscontroller = allregistrationscontroller;
    allregistrationsbyidcontroller = allregistrationsbyidcontroller;

}

const Controllers = new ControllerClass();
export default Controllers;
