<script setup lang="ts">
const { slug } = useRoute().params;
</script>
<template>
  <v-container>Topics- {{ slug }}</v-container>
</template>
