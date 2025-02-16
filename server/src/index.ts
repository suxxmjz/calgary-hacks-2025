import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/router";
import cors from "cors";
import { getFormattedApiResponse, HTTP_CODES } from "./utils/constants";
import { createDbClient } from "./db/db";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN ?? "",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

export const dbClient = createDbClient(process.env.DATABASE_URL ?? "");

app.use(cors(corsOptions));

app.use(express.json());

app.use("/health", (_req, res) => {
  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "Server is running!",
      code: HTTP_CODES.OK,
    })
  );
});

// TODO: add auth middleware

app.use("/api", router);

app.listen(port, () => {
  console.log(`🐢 Server running at: http://localhost:${port}`);
});
