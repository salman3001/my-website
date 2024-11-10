<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>
<template>
  <div class="tiptap" v-html="content"></div>
</template>
