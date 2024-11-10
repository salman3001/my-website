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
    <VBtn
      variant="text"
      class="text-h5"
      :color="color === 'light' ? 'primary' : 'primary'"
    >
      {{ $config.public.appName }}
    </VBtn>
  </NuxtLink>
</template>
