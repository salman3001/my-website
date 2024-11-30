<script setup lang="ts">
import type { Blog } from "~/utils/types/modals";

const appConfig = useAppConfig();

defineProps<{
  horzontal: boolean;
  blog: Blog;
}>();
</script>

<template>
  <v-card density="compact" class="bg-background pa-4" :to="routes.web.blogs.view(blog.id)">
    <v-img height="200px" class="rounded-xl elevation-10" :src="blog?.image
        ? $config.public.uploadsPath + blog?.image?.url
        : appConfig.noImageUrl
      " cover></v-img>

    <v-card-item>
      <NuxtLink @click.stop="() => { }" :to="routes.web.categories.view(blog?.blogCategory?.name!)">
        <v-chip v-if="blog?.blogCategory" size="small" rounded="md">
          {{ blog?.blogCategory?.name }}
        </v-chip>
      </NuxtLink>
    </v-card-item>

    <v-card-text class="text-h6" style="min-height: 3rem">
      <div class="line-clamp-2">
        {{ blog.title }}
      </div>
    </v-card-text>

    <v-card-text class="text-body-1 text-medium-emphasis" style="min-height: 6rem">
      <div class="line-clamp-3">
        {{ blog.shortDesc }} Lorem ipsum dolor sit amet.
      </div>
    </v-card-text>

    <v-card-item>
      <div class="d-flex ga-4">
        <v-avatar size="48">
          <v-img alt="John" :src="blog.author?.profile?.avatar ? $config.public.uploadsPath+blog.author?.profile?.avatar :appConfig.dummyAvatarUrl"></v-img>
        </v-avatar>
        <div class="d-flex flex-column text-on-background">
          <NuxtLink variant="text" @click.stop="" :href="routes.web.user.index(blog.author?.userName)">{{
            blog.author.fullName }}</NuxtLink>
          <div class="text-caption">
            {{ new Date(blog.createdAt).toDateString() }}
          </div>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
