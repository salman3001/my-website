<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { Tag } from "~/utils/types/modals";

const { data } = await useFetcherGet<IResType<{ count: number; data: Tag[] }>>(
  apiRoutes.tags.index(),
  {
    query: {
      select: ["name", "id", "icon", "count:blogs"],
      orderBy: "name:asc",
      take: 1000,
      skip: 0,
    },
  },
);
</script>

<template>
  <v-container max-width="1280" class="my-5 bg-background">
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-h5 py-5">Topics</h2>
      <div>
        <NuxtLink
          :to="routes.web.topics.index()"
          class="text-subtitle-1 text-decoration-none text-primsary"
          >View All Topics <v-icon icon="mdi-arrow-right"></v-icon
        ></NuxtLink>
      </div>
    </div>
    <v-row>
      <v-col v-for="tag in data?.data?.data" cols="12" sm="6" md="4" lg="3">
        <TopicCard :tag="tag" />
      </v-col>
    </v-row>
  </v-container>
</template>
