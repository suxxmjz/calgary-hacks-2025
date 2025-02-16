import { Badge } from "../types";

export const POSSIBLE_BADGES: readonly Omit<
  Badge,
  "id" | "userId" | "dateEarned"
>[] = [
  {
    title: "Level 1",
    description:
      "You've earned your first badge! Nice work on your first post.",
    imageUrl:
      "https://rljkmgjfdqqolgyolhwv.supabase.co/storage/v1/object/public/wilddex-images/uploads/badge1.jpg",
  },
  {
    title: "Level 2",
    description: "You've earned your first upvote! Keep up the good work.",
    imageUrl:
      "https://rljkmgjfdqqolgyolhwv.supabase.co/storage/v1/object/public/wilddex-images/uploads/badge2.jpg",
  },
  {
    title: "Level 3",
    description: "Nice work on 5 posts! You're really making a difference.",
    imageUrl:
      "https://rljkmgjfdqqolgyolhwv.supabase.co/storage/v1/object/public/wilddex-images/uploads/badge3.jpg",
  },
];
