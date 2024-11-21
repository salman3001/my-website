<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogCategory } from "~/utils/types/modals";

const { slug } = useRoute().params;

const search = ref("");


const { data } = await useFetcherGet<
  IResType<BlogCategory>
>(apiRoutes.blogCategory.view(slug as string), {
  query: {
    select: ["name", "id", "icon", "count:blogs"],
    orderBy: "name:asc",
    take: 1000,
    skip: 0,
  },
});


</script>
<template>
  <br />
  <v-container max-width="1280">
    <div class="d-flex justify-space-between align-center ga-4 flex-wrap">
      <h1>{{ data?.data?.name }}</h1>

      <div class="d-flex ga-2 align-center flex-wrap">
        <v-text-field v-model="search" placeholder="Search Blogs" style="max-inline-size: 200px; min-inline-size: 200px"
          hide-details append-inner-icon="mdi-magnify" />
      </div>
    </div>
    <br />
    <br />
    <ListsBlogs :per-page="20" :is-published="true" show-pagination v-model:search="search"
      :blog-category-id="data?.data?.id" />
  </v-container>
</template>

