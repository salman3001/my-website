<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
  content: string;
  /** in case if the server url host is changed,
   * you can force outdated img url in html content to use the latest server host name.
   *  Host name will be picked from baseApi variable in nuxt config
   * or you can set a default value here so no need to pass this prop everywhere html is rendered
   * */
  useUpdatedServerHost?: boolean;
}>();

const imageRefs = ref<HTMLImageElement[]>([]);
const imageUrls = ref<string[]>([]);
const containerRef = ref<HTMLDivElement>();
const hiddenElemContainerRef = ref<HTMLDivElement>();

onMounted(() => {
  if (containerRef.value) {
    imageRefs.value = Array.from(containerRef.value.querySelectorAll("img"));
  }

  if (imageRefs.value.length) {
    imageRefs.value.forEach((img, i) => {
      if (props.useUpdatedServerHost) {
        const serverUrl = new URL(config.public.baseApi);
        const imgUrl = new URL(img.src);
        imgUrl.host = serverUrl.host;
        img.src = imgUrl.href;
      }

      imageUrls.value?.push(img.src);

      img.addEventListener("click", () => {
        if (hiddenElemContainerRef.value) {
          console.log(hiddenElemContainerRef);

          const hiddenSpan = hiddenElemContainerRef.value.querySelector(
            `[data-image="${i}"]`,
          ) as HTMLSpanElement;
          console.log(hiddenSpan);

          if (hiddenSpan) {
            hiddenSpan.click();
          }
        }
      });
    });
  }
});
</script>
<template>
  <div ref="containerRef">
    <div class="tiptap tiptap-content" v-html="content"></div>
  </div>
  <EasyLightbox :images="imageUrls">
    <template #default="{ props }">
      <div ref="hiddenElemContainerRef">
        <span
          v-for="(img, index) in props.images || []"
          :data-image="index"
          @click="() => props.onShow(index)"
          style="display: none"
        ></span>
      </div>
    </template>
  </EasyLightbox>
</template>
