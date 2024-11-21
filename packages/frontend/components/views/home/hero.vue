<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
  <div class="d-flex flex-column fill-height justify-center align-center pa-1 text-center" style="min-height: 90vh">
    <h1 class="text-h3 font-weight-thin mb-4">
      Welcome to {{ $config.public.appName }}
    </h1>

    <h4 class="subheading text-h6" style="max-width: 40rem">
      Crafting Knowledge, Sharing Passion and Resource for Learning and Growth
    </h4>
    <br />
    <div class="d-flex flex-column ga-4">
      <v-btn v-if="!user" variant="outlined">New to {{ $config.public.appName }}? Signup</v-btn>
      <v-btn color="primary" variant="outlined" :to="routes.web.tutorials.index()" nuxt>Explore Tutorials</v-btn>
      <v-btn color="primary" variant="outlined" :to="routes.web.blogs.index()" nuxt>View Blogs</v-btn>
      <v-btn v-if="!user" color="primary" :to="routes.auth.signup()" nuxt>Signup</v-btn>
    </div>
  </div>
</template>
