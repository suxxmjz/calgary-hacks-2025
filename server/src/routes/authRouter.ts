import { Router } from "express";
import { RegisterRequestBody } from "../types";
import { getFormattedApiResponse, HTTP_CODES } from "../utils/constants";
import {
  addUserAccount,
  getHashedPassword,
  getUserByEmail,
} from "../models/authModel";

export const authRouter = Router();

authRouter.post("/register", async (req: RegisterRequestBody, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required fields.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const userExists = await getUserByEmail(email);
  if (userExists) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "User already exists.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const hashedPassword = await getHashedPassword(password);

  const addSuccess = await addUserAccount(email, name, hashedPassword);
  if (!addSuccess) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error creating user account.",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "User account added successfully.",
      code: HTTP_CODES.OK,
    })
  );
});
