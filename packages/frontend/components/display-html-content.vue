<script setup lang="ts">
import "ckeditor5/ckeditor5.css";

defineProps<{
  content: string;
}>();
</script>
<template>
  <div v-html="content"></div>
</template>
