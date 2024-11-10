<template>
  <v-container class="my-5">
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-h5 py-5">Featured Tutorials</h2>
      <div>
        <NuxtLink
          :to="routes.web.tutorials.index()"
          class="text-subtitle-1 text-decoration-none text-primsary"
          >View All Totorials <v-icon icon="mdi-arrow-right"></v-icon
        ></NuxtLink>
      </div>
    </div>
    <v-row>
      <v-col v-for="b in [1, 2, 3, 4, 5, 6]" cols="12" sm="6" md="4" lg="3">
        <!-- <BlogCard /> -->
      </v-col>
    </v-row>
  </v-container>
</template>
