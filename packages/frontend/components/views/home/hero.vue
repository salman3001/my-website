<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div class="d-flex flex-column fill-height justify-center align-center pa-1 text-center" style="min-height: 90vh">
    <h1 class="text-h3 font-weight-thin mb-4">
      Welcome to {{ $config.public.appName }}
    </h1>

    <h4 class="subheading text-h6" style="max-width: 30rem">
      Crafting Knowledge, Sharing Passion and Resource for Learning and Growth
    </h4>
    <br />
    <div class="d-flex flex-column ga-4 mt-4">
      <v-btn v-if="!user" variant="outlined" :to="routes.auth.signup()">New to {{ $config.public.appName }}?
        Signup</v-btn>
      <v-btn color="primary" variant="outlined" :to="routes.web.tutorials.index()" prepend-icon="mdi-cast-education"
        nuxt>Explore Tutorials</v-btn>
      <v-btn color="primary" variant="outlined" :to="routes.web.blogs.index()" nuxt prepend-icon="mdi-post-outline">View
        Blogs</v-btn>
      <v-btn color="primary" variant="outlined" :to="routes.web.discussions.index()" prepend-icon="mdi-chat-outline"
        nuxt>Start Discussion</v-btn>
      <v-btn color="primary" :to="routes.web.portfolio.index()" nuxt prepend-icon="mdi-briefcase-outline">View
        Portfolio</v-btn>
    </div>
  </div>
</template>
