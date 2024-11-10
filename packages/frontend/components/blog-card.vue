<script setup lang="ts">
import type { Blog } from "~/utils/types/modals";

const appConfig = useAppConfig();

defineProps<{
  horzontal: boolean;
  blog: Blog;
}>();
</script>

<template>
  <v-card
    class="border-none bg-background pa-4"
    :to="routes.web.blogs.view(blog.id)"
  >
    <v-row no-gutters :class="{ 'flex-column': horzontal ? false : true }">
      <v-col :cols="horzontal ? 6 : 12">
        <v-img
          height="200px"
          class="rounded-xl elevation-10"
          :src="
            blog?.image
              ? $config.public.uploadsPath + blog?.image?.url
              : appConfig.noImageUrl
          "
          cover
        ></v-img>
      </v-col>
      <v-col :cols="horzontal ? 6 : 12">
        <div>
          <v-card-item>
            <v-chip v-if="blog?.blogCategory" size="small">
              {{ blog?.blogCategory?.name }}
            </v-chip>
          </v-card-item>

          <v-card-title class="text-subtitle-1">
            {{ blog.title }}
          </v-card-title>

          <v-card-text
            class="text-body-1 line-clamp-4 text-medium-emphasis"
            style="max-height: 90px"
          >
            {{ blog.shortDesc }}
          </v-card-text>
          <br />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
