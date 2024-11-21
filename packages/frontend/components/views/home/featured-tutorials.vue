<template>
  <v-container max-width="1280" class="my-5">
    <div class="d-flex align-center justify-space-between">
      <h2 class="py-5">Featured Tutorials</h2>
      <div>
        <NuxtLink :to="routes.web.tutorials.index()" class="text-subtitle-1 text-decoration-none text-primsary">View All
          Tutorials <v-icon icon="mdi-arrow-right"></v-icon></NuxtLink>
      </div>
    </div>
    <ListsBlogs :per-page="10" :is-featured="true" :is-published="true" blog-category-id="tutorials" />
  </v-container>
</template>
