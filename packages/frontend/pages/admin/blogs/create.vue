<script setup lang="ts"></script>

<template>
  <v-container max-width="1280">
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.admin.blogs.index()"
      />
      <h1 class="text-h6">Create Blog</h1>
    </div>
    <br />
    <FormsBlogCreateUpdate type="create" />
  </v-container>
</template>
