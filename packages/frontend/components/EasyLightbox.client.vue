<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";
import { ref } from "vue";

const props = defineProps<{
  images: string[];
}>();
const visibleRef = ref(false);
const indexRef = ref(0); // default 0
const imgsRef = ref<string[]>(props.images);

const onShow = (index: number = 0) => {
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => (visibleRef.value = false);
</script>

<template>
  <slot :props="{ images, onShow }" />
  <div>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>
