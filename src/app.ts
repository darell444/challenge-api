import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(pollRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Poll API is running" });
});

export default app;
