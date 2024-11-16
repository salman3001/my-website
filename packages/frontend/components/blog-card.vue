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
    density="compact"
    class="bg-background pa-4"
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
            <NuxtLink @click.stop="() => {}" href="#">
              <v-chip v-if="blog?.blogCategory" size="small" rounded="md">
                {{ blog?.blogCategory?.name }}
              </v-chip>
            </NuxtLink>
          </v-card-item>

          <v-card-text class="text-h6 line-clamp-3 py-0">
            {{ blog.title }}
          </v-card-text>

          <v-card-text class="text-body-1 line-clamp-3 text-medium-emphasis">
            {{ blog.shortDesc }}
          </v-card-text>

          <v-card-item>
            <div class="d-flex ga-4">
              <v-avatar size="48">
                <v-img
                  alt="John"
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
              </v-avatar>
              <div class="d-flex flex-column text-on-background">
                <NuxtLink
                  variant="text"
                  @click.stop=""
                  :href="apiRoutes.users.publicProfile(blog.author?.userName)"
                  >{{ blog.author.fullName }}</NuxtLink
                >
                <div class="text-caption">
                  {{ new Date(blog.createdAt).toDateString() }}
                </div>
              </div>
            </div>
          </v-card-item>

          <br />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
