<script setup lang="ts">
defineProps<{
  type:
    | "button"
    | "article"
    | "table"
    | "image"
    | "text"
    | "table-row"
    | "list-item"
    | "sentences"
    | "heading"
    | "divider"
    | "subtitle"
    | "chip"
    | "avatar"
    | "actions"
    | "paragraph"
    | "ossein"
    | "card"
    | "card-avatar"
    | "date-picker"
    | "date-picker-options"
    | "date-picker-days"
    | "list-item-avatar"
    | "list-item-two-line"
    | "list-item-avatar-two-line"
    | "list-item-three-line"
    | "list-item-avatar-three-line"
    | "table-heading"
    | "table-thead"
    | "table-tbody"
    | "table-row-divider"
    | "table-tfoot";
}>();
</script>
<template>
  <v-skeleton-loader :type="type"></v-skeleton-loader>
</template>
