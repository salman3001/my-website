<script setup lang="ts">
import type { BlogCategory } from "~/utils/types/modals";

defineProps<{ category: BlogCategory }>();
const appConfig = useAppConfig();
</script>

<template>
  <v-card class="mx-auto bg-background" :min-width="220" :to="routes.web.categories.view(category?.id)" nuxt>
    <template #prepend>
      <v-img :src="category.icon
          ? $config.public.uploadsPath + category?.icon?.url
          : appConfig.noImageUrl
        " class="rounded-xl elevation-10" cover height="70" width="70"></v-img>
    </template>
    <template #title>
      <span class="ml-4"> {{ category.name }} </span>
    </template>
    <template #subtitle>
      <span class="ml-4"> {{ category?._count?.blogs }} Articals </span>
    </template>
  </v-card>
</template>
