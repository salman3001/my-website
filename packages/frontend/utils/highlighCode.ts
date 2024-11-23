import { codeToHtml, type BundledLanguage } from "shiki";

export const highlightCode = async (
  containerRef: Ref<HTMLElement | undefined>,
) => {
  if (containerRef.value) {
    const codeElements = Array.from(
      containerRef.value.querySelectorAll("code"),
    );
    for (const code of codeElements) {
      const lang = code.classList[0]?.split("-")[1];
      const currentHtml = code.innerHTML;
      code.innerHTML = await codeToHtml(currentHtml, {
        lang: lang || "javascript",
        theme: "dark-plus",
      });
    }
  }
};
