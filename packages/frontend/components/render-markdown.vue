<script setup lang="ts">
// @ts-ignore
import VueMarkdown from "vue-markdown-render";

defineProps<{
  content: string;
}>();
</script>
<template>
  <vue-markdown :source="content" class="markdown" />
</template>
