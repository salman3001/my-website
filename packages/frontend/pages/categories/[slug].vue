<script setup lang="ts">
const { slug } = useRoute().params;
</script>
<template>
  <v-container>category- {{ slug }}</v-container>
</template>
