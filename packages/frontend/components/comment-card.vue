<script setup lang="ts">
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const showReplies = ref(false);

defineProps<{
  comment: BlogComment | DiscussionComment;
  blogId?: string;
  discussionId?: string;
}>();

const { exec: deleteComment, loading: isDeleting } = useFetcher();
</script>
<template>
  <v-card
    class="bg-background"
    border="none"
    style="min-width: 200px"
    :style="{ overflow: $vuetify.display.smAndDown ? 'scroll' : 'auto' }"
  >
    <VCardItem>
      <div class="d-flex ga-4">
        <div>
          <VAvatar
            image="https://cdn.vuetifyjs.com/images/john.jpg"
            rounded="lg"
            size="64"
          >
          </VAvatar>
        </div>
        <div>
          <div>{{ comment.user.fullName }}</div>
          <div class="text-caption">
            Commented on
            {{ new Date(comment.user.createdAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </VCardItem>
    <VCardText class="text-body-1">
      {{ comment.message }}
    </VCardText>
    <VCardActions class="mx-2">
      <v-btn
        prepend-icon="mdi-heart"
        color="primary"
        variant="tonal"
        size="small"
      >
        5
      </v-btn>
      <v-btn
        prepend-icon="mdi-message"
        color="primary"
        variant="tonal"
        size="small"
        @click="() => (showReplies = !showReplies)"
      >
        {{ comment?._count?.replies }}
      </v-btn>
      <v-btn
        icon="mdi-delete"
        color="error"
        variant="text"
        size="small"
        @click="
          async () => {
            await deleteComment(apiRoutes.blogComments.delete(comment.id), {
              method: 'delete',
            });
          }
        "
        :disabled="isDeleting"
      >
      </v-btn>
    </VCardActions>
  </v-card>
  <div v-if="showReplies" class="ml-5 border-s-md">
    <div class="mt-2 py-2 pl-5">
      <ListsComments
        type="blog"
        :blog-id="blogId"
        :discussion-id="discussionId"
        :parent-id="comment.id"
        :with-reply-form="true"
      />
    </div>
  </div>
</template>
