<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const model = defineModel<string>({ required: true });
</script>

<template>
  <MdEditor preview v-model="model" language="en" />
</template>
