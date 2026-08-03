import { onMounted, onUnmounted } from "vue";

/**
 * Adiciona a classe "visible" aos elementos com a classe global `.reveal`
 * conforme eles entram na viewport (scroll reveal). Chamado uma vez pela
 * landing, que engloba todas as seções filhas.
 */
export function useScrollReveal() {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
    observer = null;
  });
}
