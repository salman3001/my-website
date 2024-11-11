<script setup lang="ts">
const { lightBoxSrc, setLightBoxSrc } = useLightbox();

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setLightBoxSrc("");
    }
  });
});
</script>

<template>
  <div
    id="lightboxOverlay"
    class="lightbox-overlay"
    :style="{ display: lightBoxSrc ? 'flex' : 'none' }"
    @click="() => setLightBoxSrc('')"
    @keyup.esc="() => setLightBoxSrc('')"
  >
    <v-btn
      icon="mdi-close"
      class="close-btn"
      @click="() => setLightBoxSrc('')"
    ></v-btn>
    <img
      id="lightboxImg"
      :src="lightBoxSrc"
      alt="Expanded Image"
      @click.stop=""
    />
  </div>
</template>

<style scoped>
.lightbox-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 5rem;
  right: 3rem;
}

/* Lightbox image */
.lightbox-overlay img {
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
