import { Router } from "express";
import { authRouter } from "./authRouter";
import { postsRouter } from "./postsRouter";
import { badgeRouter } from "./badgeRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/badges", badgeRouter);
