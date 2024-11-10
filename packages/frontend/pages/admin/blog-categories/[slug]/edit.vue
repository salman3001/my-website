<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogCategory } from "~/utils/types/modals";

const { slug } = useRoute().params;

const { data } = await useFetcherGet<IResType<BlogCategory>>(
  apiRoutes.blogCategory.view(slug as string),
  {
    query: {
      select: ["name", "id", "desc"],
    },
  },
);
</script>

<template>
  <v-container max-width="1280">
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.admin.blogCategories.index()"
      />
      <h1 class="text-h6">Edit Blog Category</h1>
    </div>
    <br />
    <FormsBlogCategoryCreateUpdate :blog-category="data?.data" type="update" />
  </v-container>
</template>
