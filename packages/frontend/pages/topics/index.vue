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
  <v-container max-width="1280">
    <h1>Topics</h1>

    <br />
    <v-row>
      <v-col v-for="tag in data?.data?.data" cols="12" sm="6" md="4" lg="3">
        <TopicCard :tag="tag" />
      </v-col>
    </v-row>
    <br />
    <br />
  </v-container>
</template>
