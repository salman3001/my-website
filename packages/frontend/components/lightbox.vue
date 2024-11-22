<script setup lang="ts">
// const { lightBoxSrc, setLightBoxSrc } = useLightbox();

// const addKeyEvents = (e: KeyboardEvent) => {
//   if (e.key === "Escape") {
//     setLightBoxSrc({});
//   }

//   if (e.key === "ArrowRight") {
//     if (lightBoxSrc.next) {
//       console.log(lightBoxSrc.next);

//       setLightBoxSrc();
//     }
//   }

//   if (e.key === "ArrowLeft") {
//     if (prevSrc.value) {
//       console.log(prevSrc.value);

//       setLightBoxSrc(prevSrc.value);
//     }
//   }
// };

// watch(lightBoxSrc, () => {
//   if (lightBoxSrc.value) {
//     document.addEventListener("keydown", addKeyEvents);
//   } else {
//     document.removeEventListener("keydown", addKeyEvents);
//   }
// });
</script>

<template>
  <!-- <Transition>
    <div
      v-if="lightBoxSrc"
      id="lightboxOverlay"
      class="lightbox-overlay"
      @click="() => setLightBoxSrc('')"
      @keyup.esc="() => setLightBoxSrc('')"
    >
      <v-btn
        icon="mdi-close"
        variant="text"
        color="white"
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
  </Transition> -->
</template>
<!-- 
<style scoped>
.lightbox-overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 10000;
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
</style> -->
