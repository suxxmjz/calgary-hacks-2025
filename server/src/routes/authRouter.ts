import { Router } from "express";
import { LoginRequestBody, RegisterRequestBody, User } from "../types";
import { getFormattedApiResponse, HTTP_CODES } from "../utils/constants";
import {
  addUserAccount,
  doUserPasswordsMatch,
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

authRouter.post("/login", async (req: LoginRequestBody, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required fields.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    res.status(HTTP_CODES.NOT_FOUND).json(
      getFormattedApiResponse({
        message: "User not found.",
        code: HTTP_CODES.NOT_FOUND,
      })
    );
    return;
  }

  if (!doUserPasswordsMatch(user.id, password)) {
    res.status(HTTP_CODES.UNAUTHORIZED).json(
      getFormattedApiResponse({
        message: `Password is incorrect for email ${email}`,
        code: HTTP_CODES.UNAUTHORIZED,
      })
    );
    return;
  }

  const safeUser: User = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
});
