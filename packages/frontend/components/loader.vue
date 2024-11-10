<script setup lang="ts">
defineProps<{ type: string }>();
</script>
<template>
  <v-skeleton-loader :type="type"></v-skeleton-loader>
</template>
