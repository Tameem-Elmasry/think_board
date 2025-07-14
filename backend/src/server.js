// @ imports
import express from "express";
import mainRouter from "./routes/mainRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import cookieParser from "cookie-parser";


// @ configurations
dotenv.config();

// @ constants
const app = express();
const port = process.env.PORT || 5001;

// @ middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(mainRouter);

// @ database and server running
connectDB().then(() => {
    app.listen(port, () =>
        console.log(`Server is running on http://localhost:${port}`)
    );
});
