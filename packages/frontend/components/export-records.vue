<script setup lang="ts">
defineProps<{
  exportUrl: string;
}>();
</script>

<template>
  <VBtn
    variant="tonal"
    prepend-icon="mdi-download"
    text="XLSX"
    :href="exportUrl"
    traget="_blank"
  />
</template>
