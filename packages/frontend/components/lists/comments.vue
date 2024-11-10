<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const props = defineProps<{
  type: "blog" | "discussion";
  blogId?: string;
  discussionId?: string;
  parentId?: number;
  withReplyForm?: boolean;
}>();

const { data, status, refresh } = await useFetcherGet<
  IResType<{ count: number; data: BlogComment[] | DiscussionComment[] }>
>(
  props.type === "blog"
    ? apiRoutes.blogComments.index()
    : apiRoutes.discussionComments.index(),
  {
    query: {
      select: [
        "id",
        "message",
        "createdAt",
        "user",
        "parentId",
        "count:replies",
      ],
      take: 1000,
      skip: 0,
      orderBy: "createdAt:desc",
      ...(props.blogId ? { blogId: props.blogId } : {}),
      ...(props.discussionId ? { discussionId: props.discussionId } : {}),
      ...(props.parentId ? { parentId: props.parentId } : {}),
    },
  },
);
</script>

<template>
  <div class="d-flex flex-column ga-4" v-if="data">
    <v-card
      v-if="data.data?.data.length === 0 && !parentId"
      class="bg-background py-8 text-center"
    >
      <v-card-item>
        <v-icon icon="mdi-message" size="64" color="primary"></v-icon>
      </v-card-item>
      <v-card-item>Be the first to Comment!</v-card-item>
    </v-card>
    <CommentCard
      v-for="comment in data.data?.data"
      :comment="comment"
      :blog-id="blogId"
      :discussion-id="discussionId"
    />
    <FormsAddComment
      v-if="withReplyForm"
      :blog-id="blogId"
      placeholder="Reply"
      type="blog"
      :parent-id="parentId"
      :rows="withReplyForm ? 2 : undefined"
      @success="() => refresh()"
    />
  </div>

  <Loader v-else type="card" />
</template>
