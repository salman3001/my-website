<script setup lang="ts">
import type { Tag } from "~/utils/types/modals";

defineProps<{ tag: Tag }>();
const appConfig = useAppConfig();
</script>

<template>
  <v-card
    class="mx-auto bg-background"
    :min-width="220"
    :to="routes.web.topics.view(tag?.id)"
    nuxt
  >
    <template #prepend>
      <v-img
        :src="
          tag.icon
            ? $config.public.uploadsPath + tag?.icon?.url
            : appConfig.noImageUrl
        "
        cover
        class="rounded-xl elevation-10"
        height="70"
        width="70"
      ></v-img>
    </template>
    <template #title>
      <span class="ml-4"> {{ tag.name }} </span>
    </template>
    <template #subtitle>
      <span class="ml-4"> {{ tag?._count?.blogs }} Articals </span>
    </template>
  </v-card>
</template>
