<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Tag } from "~/utils/types/modals";

const search = ref("");
const topic = ref("");

const { data: tags } = await useFetcherGet<
  IResType<{ count: number; data: Tag[] }>
>(apiRoutes.tags.index(), {
  query: {
    select: ["name", "id"],
    orderBy: "name:asc",
    take: 1000,
    skip: 0,
  },
});
</script>
<template>
  <v-container max-width="1280">
    <br />
    <div class="d-flex justify-space-between align-center ga-4 flex-wrap">
      <h1>Tutorials</h1>

      <div class="d-flex ga-2 align-center flex-wrap">
        <v-text-field
          v-model="search"
          placeholder="Search Tutorials"
          style="max-inline-size: 200px; min-inline-size: 200px"
          hide-details
          append-inner-icon="mdi-magnify"
        />

        <v-select
          style="min-inline-size: 150px"
          placeholder="Topics"
          v-model="topic"
          :items="(tags?.data?.data || []).concat([{ name: 'All Tags', id: '' } as any])"
          item-value="id"
          item-title="name"
          hide-details
        />
      </div>
    </div>
    <br />
    <br />
    <ListsBlogs
      :per-page="10"
      :is-published="true"
      show-pagination
      v-model:search="search"
      :tag-id="topic"
      :blog-category-id="'tutorials'"
    />
  </v-container>
</template>
