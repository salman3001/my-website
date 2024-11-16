<script setup lang="ts">
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const showReplies = ref(false);

defineProps<{
  comment: BlogComment | DiscussionComment;
}>();

const showReplyForm = ref(false);
const listRef = ref();

const { exec: deleteComment, loading: isDeleting } = useFetcher();
const { user } = useAuth();

defineEmits<{
  deleted: [];
}>();
</script>
<template>
  <v-card
    class="bg-background"
    rounded="0"
    style="min-width: 200px"
    :style="{ overflow: $vuetify.display.smAndDown ? 'scroll' : 'auto' }"
    density="compact"
  >
    <VCardItem class="pa-0">
      <div class="d-flex ga-4 justify-space-between pt-2">
        <div class="d-flex ga-4">
          <div>
            <VAvatar
              image="https://cdn.vuetifyjs.com/images/john.jpg"
              rounded="lg"
              size="44"
            >
            </VAvatar>
          </div>
          <div>
            <div>{{ comment.user.fullName }}</div>
            <div class="text-caption">
              {{ new Date(comment.user.createdAt).toLocaleDateString() }}
            </div>
          </div>
        </div>
        <v-menu location="left bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              size="small"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list density="compact">
            <v-list-item>
              <v-list-item-title>Report Abuse</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </VCardItem>
    <VCardText class="text-body-1 pa-2">
      <DisplayHtmlContent
        :content="comment.message"
        :unique-id="'comment-' + comment.id"
      />
    </VCardText>

    <VCardActions class="pa-0 ma-0" style="min-height: auto">
      <div class="d-flex flex-wrap-reverse justify-space-between w-100">
        <div>
          <v-btn variant="text" size="small">
            <v-icon icon="mdi-heart-outline"></v-icon>20
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            v-if="comment?._count?.replies > 0"
            @click="() => (showReplies = !showReplies)"
          >
            <v-icon icon="mdi-chat-outline"> </v-icon
            >{{ comment?._count?.replies }}
          </v-btn>
        </div>
        <div>
          <v-btn
            variant="text"
            size="small"
            @click="() => (showReplyForm = !showReplyForm)"
          >
            Reply
          </v-btn>
          <DialogsConfirm
            v-if="user?.userType === 'Admin'"
            @confirm="
              async () => {
                await deleteComment(
                  apiRoutes.blogComments.delete(comment.id),
                  {
                    method: 'delete',
                  },
                  {
                    onSuccess: () => {
                      $emit('deleted');
                    },
                  },
                );
              }
            "
          >
            <template #default="{ props }">
              <v-btn
                v-bind="props"
                color="error"
                variant="text"
                size="small"
                :disabled="isDeleting"
                icon="mdi-delete"
              >
              </v-btn>
            </template>
          </DialogsConfirm>
        </div>
      </div>
    </VCardActions>
    <v-card-item class="pt-1">
      <Transition>
        <FormsAddCommentReply
          v-if="showReplyForm"
          type="blog"
          :blog-id="(comment as BlogComment)?.blogId"
          :parent-id="comment.id"
          @success="
            () => {
              if (!showReplies) {
                showReplies = true;
                showReplyForm = false;
              } else {
                showReplyForm = false;
                listRef?.refreshComments();
              }
            }
          "
        />
      </Transition>
    </v-card-item>
  </v-card>
  <Transition>
    <div v-if="showReplies" class="ml-1">
      <div class="pl-2">
        <ListsComments
          ref="listRef"
          type="blog"
          :blog-id="(comment as BlogComment).blogId"
          :parent-id="comment.id"
          :are-replies="true"
        />
      </div>
    </div>
  </Transition>
</template>
