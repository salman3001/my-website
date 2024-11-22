<script setup lang="ts">
defineProps<{ width?: string; height?: string; id: string }>();
</script>
<template>
  <div class="flex">
    <iframe
      :width="width || '560'"
      :height="height || '315'"
      :src="`https://www.youtube.com/embed/${id}`"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>
