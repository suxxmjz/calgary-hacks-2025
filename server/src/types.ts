import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface Post {
  id: number;
  userId: string;
  animal: string;
  notes: string | null;
  conservationNotes: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  upvotes: number;
}

export type CreatePostRequestBody = TypedRequestBody<{
  userId: string;
  notes: string | undefined;
  encodedImage: string;
  timestamp: string;
  latitude: number;
  longitude: number;
}>;

export type CreatePostInsert = Omit<Post, "id" | "createdAt" | "upvotes">;

export type UpvotePostRequestBody = TypedRequestBody<
  Pick<Post, "id"> & { operation: "increment" | "decrement"; userId: string }
>;

export interface Badge {
  id: number;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  dateEarned: Date;
}

export type AssignBadgeInsert = Omit<Badge, "id" | "dateEarned">;

export type RegisterRequestBody = TypedRequestBody<User>;

export interface User {
  id: string;
  username: string;
}
