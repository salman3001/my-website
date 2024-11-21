<script setup lang="ts">
import type { Discussion } from "~/utils/types/modals";

defineProps<{
  disicussion: Discussion;
}>();
</script>

<template>
  <v-card class="bg-background" subtitle="prepend-icon and append-icon" :to="routes.web.discussions.view(disicussion.id)">
    <template #title>
      <h5>{{ disicussion?.user?.userName }}</h5>
    </template>
    <template #subtitle>
      <div class="d-flex flex-wrap ga-2 alighn-center">
        <div class="text-caption text-center">
          started {{ new Date(disicussion.createdAt).toDateString() }}
        </div>
      </div>
    </template>
    <template #prepend>
      <v-avatar>
        <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-avatar>
    </template>
    <v-card-text style="height: 3rem; overflow: hidden" class="py-0">
      <h3 class="line-clamp-2 py-0">
        {{ disicussion.title }}
      </h3>
    </v-card-text>
    <v-card-actions>
      <VChipGroup color="primary" column class="pa-1">
        <v-tooltip text="Replies">
          <template #activator="{ props }">
            <v-chip v-bind="props" prepend-icon="mdi-chat-outline" size="small" color="primary" variant="elevated">
              {{ disicussion?._count?.comment }}
            </v-chip>
          </template>
        </v-tooltip>
        <VChip v-for="tag in disicussion.tags" :text="tag.name" variant="tonal" size="small"
          :to="routes.web.discussions.index() + `?tag=${tag.id}`" />
      </VChipGroup>
    </v-card-actions>
  </v-card>
</template>
