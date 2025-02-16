import { Router } from "express";
import { RegisterRequestBody } from "../types";
import { getFormattedApiResponse, HTTP_CODES } from "../utils/constants";
import { addUserAccount, getUserById } from "../models/authModel";

export const authRouter = Router();

authRouter.post("/register", async (req: RegisterRequestBody, res) => {
  const { id, username } = req.body;
  if (!id || !username) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required fields.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const userExists = await getUserById(id);
  if (userExists) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "User already exists.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const addSuccess = await addUserAccount(id, username);
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
