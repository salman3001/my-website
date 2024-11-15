<script setup lang="ts">
defineProps<{
  content: string;
}>();

const { setLightBoxSrc } = useLightbox();

onMounted(() => {
  // Select all img tags in the content
  const images = document.querySelectorAll(
    "tiptap img",
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
  <div class="tiptap" v-html="content"></div>
</template>
