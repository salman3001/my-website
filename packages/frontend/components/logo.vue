<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: "light" | "dark";
  }>(),
  { color: "light" },
);
</script>



<template>
  <NuxtLink :to="routes.web.home()">
    <VImg :src="$vuetify.theme.name === 'dark' ? '/images/logo/logo-white.webp' : '/images/logo/logo-black.webp'"
      width="150px" />
  </NuxtLink>
</template>
