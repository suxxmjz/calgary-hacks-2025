import { Post } from "@/types/postTypes";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { ApiResponse } from "@/types/apiTypes";
import { BASE_API_URL } from "@/App";

interface UseFetchPostsReturn {
  readonly posts: readonly Post[];
  readonly loading: boolean;
  readonly error: boolean;
}

export function useFetchPosts({
  userId,
}: {
  userId: number | undefined;
}): UseFetchPostsReturn {
  const { toast } = useToast();

  const endpoint = userId ? `posts/${userId}` : `posts`;

  const { isPending, isError, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast({
          title: "Error fetching posts",
          description: "Please try again later.",
        });
        return;
      }

      const postsResponse: ApiResponse<readonly Post[]> = await response.json();
      return postsResponse.data;
    },
  });

  return {
    posts: data ?? [],
    loading: isPending,
    error: isError,
  };
}
