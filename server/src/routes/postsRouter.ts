import { Router } from "express";
import {
  createPost,
  getPostById,
  getPosts,
  getPostsByUserId,
  getUpvoteByPostIdAndUserId,
  updatePostVotes,
} from "../models/postsModel";
import { getFormattedApiResponse, HTTP_CODES } from "../utils/constants";
import {
  CreatePostInsert,
  CreatePostRequestBody,
  UpvotePostRequestBody,
} from "../types";
import { randomUUID } from "crypto";
import { supabase } from "../supabase/supabase";

const SUPABASE_IMAGE_BUCKET = "wilddex-images";
const BASE_64_IMAGE_REGEX = /^data:(.+);base64,(.*)$/;

export const postsRouter = Router();

// GET endpoint to fetch all posts
postsRouter.get("/", async (_req, res) => {
  const posts = await getPosts();

  if (!posts) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error fetching posts from database",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
    return;
  }

  const sortedPostsTimeDesc = [...posts].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "Posts fetched successfully",
      code: HTTP_CODES.OK,
      data: sortedPostsTimeDesc,
    })
  );
});

// GET endpoint to fetch all posts for a user by user ID
postsRouter.get("/:userId", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required User ID.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const sanitizedUserId = userId as string;
  const posts = await getPostsByUserId(sanitizedUserId);
  if (!posts) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error fetching posts from database",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
    return;
  }

  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "Posts fetched successfully",
      code: HTTP_CODES.OK,
      data: posts,
    })
  );
});

// POST endpoint to create a new post
postsRouter.post("/create", async (req: CreatePostRequestBody, res) => {
  const { userId, encodedImage, timestamp, latitude, longitude, notes } =
    req.body;

  if (!userId || !encodedImage || !timestamp || !latitude || !longitude) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required fields.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  // Decode the image

  const imageRegexMatch = encodedImage.match(BASE_64_IMAGE_REGEX);
  if (!imageRegexMatch) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Invalid image encoding",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const mimeType = imageRegexMatch[1];
  const base64EncodedImageData = imageRegexMatch[2];
  const imageBuffer = Buffer.from(base64EncodedImageData, "base64");
  const uniqueImageName = `${Date.now()}_${randomUUID()}`;

  // Classify the animal in the image make a call to the Flask API

  // Make OpenAI API call to generate conservation notes

  // Save the image to cloud storage

  const filePath = `uploads/${uniqueImageName}`;
  const { data: uploadedImage, error: imageUploadError } =
    await supabase.storage
      .from(SUPABASE_IMAGE_BUCKET)
      .upload(filePath, imageBuffer, {
        contentType: mimeType,
      });
  if (imageUploadError || !uploadedImage) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error uploading image to cloud storage",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  // Save the post to the database
  const dbInsert: CreatePostInsert = {
    userId,
    animal: "Cow", // TODO: Placeholder for now,
    notes: notes ?? null,
    conservationNotes: "Placeholder conservation notes", // TODO: Placeholder for now,
    imageUrl: uploadedImage.fullPath,
    latitude,
    longitude,
  };

  const createSuccess = await createPost(dbInsert);
  if (!createSuccess) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error creating post in database",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  // TODO: Check if the user qualifies for a badge, and if so, create a badge in the database

  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "Post created successfully",
      code: HTTP_CODES.OK,
    })
  );
});

// POST endpoint to upvote a post
postsRouter.post("/vote", async (req: UpvotePostRequestBody, res) => {
  const postId = req.body.id;

  if (!postId) {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "Missing required Post ID.",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const post = await getPostById(postId);
  if (post === null) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: `No post exists with id: ${postId}`,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  if (post === undefined) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: `Error fetching post with id: ${postId}`,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  const userAlreadyUpvoted = await getUpvoteByPostIdAndUserId(
    postId,
    req.body.userId
  );
  if (userAlreadyUpvoted === undefined) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error fetching upvote from database",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  if (userAlreadyUpvoted && req.body.operation === "increment") {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "User has already voted on this post",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  if (!userAlreadyUpvoted && req.body.operation === "decrement") {
    res.status(HTTP_CODES.BAD_REQUEST).json(
      getFormattedApiResponse({
        message: "User has not voted on this post",
        code: HTTP_CODES.BAD_REQUEST,
      })
    );
    return;
  }

  const updateSuccess = await updatePostVotes(
    postId,
    req.body.operation,
    req.body.userId
  );
  if (!updateSuccess) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
      getFormattedApiResponse({
        message: "Error updating post votes in database",
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      })
    );
    return;
  }

  res.status(HTTP_CODES.OK).json(
    getFormattedApiResponse({
      message: "Post votes updated successfully",
      code: HTTP_CODES.OK,
    })
  );
});
