import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/router";
import { getFormattedApiResponse, HTTP_CODES } from "./utils/constants";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
