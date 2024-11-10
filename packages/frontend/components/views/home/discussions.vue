<template>
  <v-container max-width="1280" class="my-5">
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-h5 py-5">Recent Discussions</h2>
      <div>
        <NuxtLink
          :to="routes.web.discussions.index()"
          class="text-subtitle-1 text-decoration-none text-primsary"
          >View All Discussions <v-icon icon="mdi-arrow-right"></v-icon
        ></NuxtLink>
      </div>
    </div>
    <v-row>
      <v-col v-for="b in [1, 2, 3, 4, 5, 6]" cols="12" md="6" lg="4">
        <DiscussionCard />
      </v-col>
    </v-row>
  </v-container>
</template>
