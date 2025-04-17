import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "../src/lib/swagger";
import pollRouter from "./routes/poll.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(pollRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "Poll API is running" });
});

export default app;
