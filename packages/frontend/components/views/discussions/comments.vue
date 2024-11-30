<script setup lang="ts">
defineProps<{
  discussionId: string;
  commentCount: number;
}>();

const listRef = ref();
</script>

<template>
  <div class="d-flex justify-space-between ga-2 w-100">
    <h2>Responses ({{ commentCount }})</h2>
    <v-tooltip text="Community Guidelines">
      <template v-slot:activator="{ props }">
        <v-btn variant="text" size="sm" :to="routes.web.communityGuidlines()">
          <v-icon icon="mdi-shield-outline" v-bind="props" ></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </div>

  <br />

  <ListsComments
    ref="listRef"
    type="discussion"
    :discussion-id="discussionId"
    :are-replies="false"
  />
  <div class="pb-4 mt-4">
    <FormsAddComment
      :discussion-id="discussionId"
      type="discussion"
      @success="
        () => {
          listRef.refreshComments();
        }
      "
    />
    <br />
    <v-divider></v-divider>
  </div>
</template>
