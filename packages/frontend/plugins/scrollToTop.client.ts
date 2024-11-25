const scrollToTop = () => {
  console.log("ran");

  const element = document.querySelector(
    '[class="v-main__scroller"]',
  ) as HTMLDivElement;

  if (element) {
    element.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default defineNuxtPlugin((app) => {
  app.hook("page:finish", () => {
    setTimeout(() => {
      scrollToTop();
    }, 100);
  });
});
