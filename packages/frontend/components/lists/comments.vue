<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const props = defineProps<{
  type: "blog" | "discussion";
  blogId?: string;
  discussionId?: string;
  parentId?: number;
  areReplies: boolean;
}>();

const refreshComments = () => {
  execute();
};

defineExpose({ refreshComments });

const { data, status, execute } = await useFetcherGet<
  IResType<{ count: number; data: BlogComment[] | DiscussionComment[] }>
>(
  props.type === "blog"
    ? apiRoutes.blogComments.index()
    : props.type === "discussion"
    ? apiRoutes.discussionComments.index()
    : "",

  {
    query: {
      select: [
        "id",
        "message",
        "createdAt",
        "user",
        "parentId",
        "count:replies",
        props.type === "blog" ? "blogId" : "discussionId",
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
  <div class="d-flex flex-column" v-if="data">
    <v-card
      v-if="data.data?.data.length === 0 && !areReplies"
      class="bg-background pa-0 text-center border-none"
      density="compact"
    >
      <v-card-item>
        <v-icon icon="mdi-message" size="64" color="primary"></v-icon>
      </v-card-item>
      <v-card-item>Be the first to Comment!</v-card-item>
    </v-card>
    <CommentCard
      v-for="comment in data.data?.data"
      :comment="comment"
      @deleted="refreshComments"
    />
  </div>

  <Loader v-else type="card" />
</template>
