<script setup lang="ts">
const props = defineProps<{
  content: string;
  uniqueId: string;
}>();

const { setLightBoxSrc } = useLightbox();

onMounted(() => {
  // Select all img tags in the content
  const images = document.querySelectorAll(
    `#${props.uniqueId} img`,
  ) as NodeListOf<HTMLImageElement>;

  // Add click event listener to each image
  images.forEach((img) => {
    img.addEventListener("click", function () {
      setLightBoxSrc(img.src); // Open lightbox with the clicked image's src
    });
  });
});
</script>
<template>
  <div :id="uniqueId" class="tiptap tiptap-content" v-html="content"></div>
</template>
