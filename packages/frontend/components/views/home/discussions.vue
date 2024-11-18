<template>
  <v-container max-width="1280" class="my-5">
    <div class="d-flex align-center justify-space-between">
      <h2 class="py-5">Recent Discussions</h2>
      <div>
        <NuxtLink
          :to="routes.web.discussions.index()"
          class="text-subtitle-1 text-decoration-none text-primsary"
          >View All Discussions <v-icon icon="mdi-arrow-right"></v-icon
        ></NuxtLink>
      </div>
    </div>
    <ListsDiscussions :per-page="10" :is-published="true" />
  </v-container>
</template>
