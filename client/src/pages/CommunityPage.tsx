import { JSX, useState } from "react";
import "../styles/community-page.css";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { PostCard } from "@/components/postCard";
import { Header } from "@/components/header";
import { Container } from "@/components/container";
import DropdownSelect from "@/components/dropdown";
import {
  DEFAULT_SORT_OPTION,
  DROPDOWN_SORT_OPTIONS,
  getSortedPosts,
} from "@/utils/sorting";
import { useFetchUserUpvotes } from "@/hooks/useFetchUserUpvotes";
import { useAuth } from "@/hooks/useAuth";

export function CommunityPage(): JSX.Element {
  const { user } = useAuth();
  const { posts, refetchPosts } = useFetchPosts({ userId: undefined }); // Set userId to undefined because we want all posts
  const { userUpvotedPostIds, refetchUserUpvotedPostIds } = useFetchUserUpvotes(
    { userId: user?.id }
  );

  const [sortOption, setSortOption] = useState(DEFAULT_SORT_OPTION);

  const sortedPosts = getSortedPosts(posts, sortOption.value);

  if (!user) {
    return (
      <Container>
        <Header
          header="Community Overview"
          subtext="Take a look at what others have spotted."
        />
        <p className="text-sm text-header mt-4">
          Please log in to view community posts.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Header
          header="Community Overview"
          subtext="Take a look at what others have spotted."
        />
        <DropdownSelect
          selectedOption={sortOption}
          options={DROPDOWN_SORT_OPTIONS}
          setSelectedOption={(opt) =>
            setSortOption(
              DROPDOWN_SORT_OPTIONS.find((o) => o.value === opt) ||
                DEFAULT_SORT_OPTION
            )
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 mt-4">
        {sortedPosts.length ? (
          sortedPosts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                isUpvotedByUser={userUpvotedPostIds.includes(post.id)}
                onVoteSuccess={() => {
                  refetchPosts();
                  refetchUserUpvotedPostIds();
                }}
                userId={user.id}
              />
            );
          })
        ) : (
          <p className="text-sm text-header">No posts available.</p>
        )}
      </div>
    </Container>
  );
}
