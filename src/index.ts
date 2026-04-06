import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { mongodbClient } from "./db";

const PORT = process.env.PORT || 3000;

mongodbClient.init().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});