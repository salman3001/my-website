<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
  middleware: ["is-guest"],
});
</script>
<template>
  <NuxtPage />
</template>
