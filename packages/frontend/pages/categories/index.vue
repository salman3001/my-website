<script setup lang="ts">
import CategoryCard from "~/components/category-card.vue";
import type { IResType } from "~/utils/types";
import type { BlogCategory, Tag } from "~/utils/types/modals";

const { data } = await useFetcherGet<
  IResType<{ count: number; data: BlogCategory[] }>
>(apiRoutes.blogCategory.index(), {
  query: {
    select: ["name", "id", "icon", "count:blogs"],
    orderBy: "name:asc",
    take: 1000,
    skip: 0,
  },
});
</script>

<template>
  <v-container max-width="1280">
    <h1>Categories</h1>

    <br>
    <v-row>
      <v-col v-for="tag in data?.data?.data" cols="12" sm="6" md="4" lg="3">
        <CategoryCard :category="tag" />
      </v-col>
    </v-row>
  </v-container>
</template>
