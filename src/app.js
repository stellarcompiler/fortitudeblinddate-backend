import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import tokenRoutes from "./routes/tokenRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tokens", tokenRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
