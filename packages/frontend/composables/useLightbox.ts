const lightBoxSrc = ref<string>();

export const useLightbox = () => {
  function setLightBoxSrc(src: string) {
    lightBoxSrc.value = src;
  }

  return { lightBoxSrc, setLightBoxSrc };
};
