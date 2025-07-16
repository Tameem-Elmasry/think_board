// @ imports
import express from "express";
import mainRouter from "./routes/mainRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @ configurations
dotenv.config();

// @ constants
const app = express();
const port = process.env.PORT || 5001;

// @ middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );
} else if (process.env.NODE_ENV === "production") {
    app.use(
        cors({
            origin: "https://mern-thinkboard.netlify.app",
            credentials: true,
        })
    );
}

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(mainRouter);

// @ setting the server:
if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "../../frontend/dist");
    app.use(express.static(staticPath));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(staticPath, "index.html"));
    });
}

// @ database and server running
connectDB().then(() => {
    app.listen(port, () =>
        console.log(`Server is running on http://localhost:${port}`)
    );
});
