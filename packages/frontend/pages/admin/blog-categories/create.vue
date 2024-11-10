<script setup lang="ts"></script>

<template>
  <v-container>
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.admin.blogCategories.index()"
      />
      <h1 class="text-h6">Create Blog Category</h1>
    </div>
    <br />
    <FormsBlogCategoryCreateUpdate type="create" />
  </v-container>
</template>
