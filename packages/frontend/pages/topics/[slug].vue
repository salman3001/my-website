<script setup lang="ts">
const { slug } = useRoute().params;
</script>
<template>
  <v-container max-width="1280">Topics- {{ slug }}</v-container>
</template>
