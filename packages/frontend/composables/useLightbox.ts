interface ILightBoxSrc {
  src?: string;
  next?: string;
  prev?: string;
}

const lightBoxSrc = reactive<ILightBoxSrc>({});

export const useLightbox = () => {
  function setLightBoxSrc(src: ILightBoxSrc) {
    Object.assign(lightBoxSrc, src);
  }

  return { lightBoxSrc, setLightBoxSrc };
};
