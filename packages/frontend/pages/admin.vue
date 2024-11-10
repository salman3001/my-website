<script setup lang="ts">
definePageMeta({
  middleware: ["is-admin"],
});
</script>

<template>
  <NuxtPage />
</template>
