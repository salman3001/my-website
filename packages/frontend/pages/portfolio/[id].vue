<script setup lang="ts">
import RenderMarkdown from "~/components/render-markdown.vue";
import type { IResType } from "~/utils/types";
import type { Project } from "~/utils/types/modals";

const { id } = useRoute().params;

const { data } = await useFetcherGet<IResType<Project>>(
  apiRoutes.projects.view(id as unknown as number),
  {
    query: {
      select: ["id", "title", "shortDesc", "thumbnail", "images", "tags"],
      take: 20,
      skip: 0,
    },
  },
);
</script>

<template>
  <br />
  <v-container max-width="1000">
    <h1 class="text-h4 font-weight-bold">{{ data?.data?.title }}</h1>
    <br />
    <p class="text-subtitle-1">{{ data?.data?.shortDesc }}</p>
    <br />
    put images here
    <br />

    <RenderMarkdown :content="data?.data?.desc || ''" />
  </v-container>
</template>
