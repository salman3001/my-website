<script setup lang="ts">
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
</script>

<template>
  <v-footer class="border elevation-4 pa-5 rounded-t-xl">
    <v-row justify="start" class="mx-auto" style="max-width: 1280px">
      <v-col class="d-flex flex-column pb-0" cols="12" style="margin-left: -1rem">
        <logo />
      </v-col>
      <v-col class="d-flex flex-column" cols="6" sm="4" md="4">
        <h6 class="text-h6 font-weight-bold">Content</h6>
        <NuxtLink :to="routes.web.blogs.index()">Blogs</NuxtLink>
        <NuxtLink :to="routes.web.tutorials.index()">Tutorials</NuxtLink>
        <NuxtLink :to="routes.web.discussions.index()">Discussions</NuxtLink>
        <NuxtLink :to="routes.web.categories.index()">Categories</NuxtLink>
        <NuxtLink :to="routes.web.topics.index()">Topics</NuxtLink>
      </v-col>
      <v-col class="d-flex flex-column" cols="6" sm="4" md="4">
        <h6 class="text-h6 font-weight-bold">Webiste</h6>
        <NuxtLink :to="routes.web.home()">Home</NuxtLink>
        <NuxtLink :to="routes.web.contact()">Contact</NuxtLink>
        <NuxtLink :to="routes.auth.signin()">Signin</NuxtLink>
        <NuxtLink :to="routes.auth.signup()">Signup</NuxtLink>
      </v-col>
      <v-col class="d-flex flex-column" cols="12" sm="4" md="4">
        <h6 class="text-h6 font-weight-bold">Legal</h6>
        <NuxtLink :to="routes.web.privacy()">Privacy policy</NuxtLink>
        <NuxtLink :to="routes.web.communityGuidlines()">Community Guidelines</NuxtLink>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="space-between">
          <v-col cols="12" sm="8">
            <Subscribe />
          </v-col>
          <v-col cols="12" sm="4" align-self="end" class="d-flex justify-end">
            <socila-links></socila-links>
          </v-col>

        </v-row>


      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
a {
  color: rgba(var(--v-theme-on-surface));
}
</style>
