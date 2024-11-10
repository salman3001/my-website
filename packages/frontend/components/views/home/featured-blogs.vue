<script setup lang="ts"></script>

<template>
  <v-container max-width="1280" class="my-5">
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-h5 py-5">Featured Blogs</h2>
      <div>
        <NuxtLink
          :to="routes.web.blogs.index()"
          class="text-subtitle-1 text-decoration-none text-primsary"
          >View All Blogs <v-icon icon="mdi-arrow-right"></v-icon
        ></NuxtLink>
      </div>
    </div>
    <ListsBlogs :per-page="10" :is-featured="true" :is-published="true" />
  </v-container>
</template>
