<script setup lang="ts">
defineProps<{
  blogId: string;
  commentCount: number;
}>();

const listRef = ref();
</script>

<template>
  <v-card class="bg-surface border-none" density="compact">
    <v-card-title class="d-flex justify-space-between">
      <h3>Responses ({{ commentCount }})</h3>
      <div class="d-flex ga-2">
        <v-tooltip text="Community Guidelines">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" size="sm">
              <v-icon icon="mdi-shield-outline" v-bind="props"></v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </v-card-title>
  </v-card>
  <br />
  <v-card-item>
    <div class="pb-4">
      <FormsAddComment
        :blog-id="blogId"
        type="blog"
        @success="
          () => {
            listRef.refreshComments();
          }
        "
      />
      <br />
      <v-divider></v-divider>
    </div>
    <ListsComments
      ref="listRef"
      type="blog"
      :blog-id="blogId"
      :are-replies="false"
    />
  </v-card-item>
</template>
