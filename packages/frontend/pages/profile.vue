<script setup lang="ts">
definePageMeta({
  middleware: ["is-logged-in"],
});
</script>

<template>
  <NuxtPage />
</template>
