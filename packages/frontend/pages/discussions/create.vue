<script setup lang="ts">
definePageMeta({
  middleware: ["is-logged-in"],
});
</script>

<template>
  <v-container max-width="1000">
    <br />
    <br />
    <div>
      <VBtn
        text="Back"
        variant="tonal"
        size="small"
        prepend-icon="mdi-arrow-left"
        :to="routes.web.discussions.index()"
      />
      <h1 class="text-h6">Create Discussion</h1>
    </div>
    <br />
    <FormsCreateDiscussion />
    <br />
    <br />
    <br />
  </v-container>
</template>
