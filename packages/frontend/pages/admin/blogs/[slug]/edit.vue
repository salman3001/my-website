<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Blog } from "~/utils/types/modals";

const { slug } = useRoute().params;

const { data } = await useFetcherGet<IResType<Blog>>(
  apiRoutes.blogs.view(slug as string),
  {
    query: {
      select: [
        "title",
        "id",
        "shortDesc",
        "longDesc",
        "isPublished",
        "isFeatured",
        "blogCategoryId",
        "image",
        "blogCategory",
        "tags",
        "seo",
      ],
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
        :to="routes.admin.blogs.index()"
      />
      <h1 class="text-h6">Edit Blog</h1>
    </div>
    <br />
    <FormsBlogCreateUpdate :blog="data?.data" type="update" />
  </v-container>
</template>
