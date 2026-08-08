<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const deveriaMostrar = computed(() => {
  const isPublicPage = route.meta.hideSidebar === true;
  const hasToken = !!localStorage.getItem("token");
  const descartado = localStorage.getItem("supportPromptDismissed") === "1";
  return !isPublicPage && hasToken && !descartado;
});

watch(
  deveriaMostrar,
  (mostrar) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (mostrar) {
      timer = setTimeout(() => {
        visible.value = true;
      }, 1500);
    } else {
      visible.value = false;
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

function fechar() {
  visible.value = false;
  localStorage.setItem("supportPromptDismissed", "1");
}
</script>

<template>
  <Transition name="support-prompt">
    <div
      v-if="visible"
      class="fixed bottom-5 right-5 z-50 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-school-200 bg-white dark:bg-lousa-800 dark:border-lousa-700 shadow-xl shadow-school-900/10 p-4"
    >
      <button
        type="button"
        aria-label="Fechar"
        @click="fechar"
        class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-school-400 hover:text-school-600 hover:bg-school-100 dark:text-lousa-500 dark:hover:text-lousa-200 dark:hover:bg-lousa-700 transition-colors"
      >
        <i class="pi pi-times text-sm"></i>
      </button>

      <div class="flex items-center gap-2 mb-2">
        <span class="text-2xl leading-none">💚</span>
        <p class="text-base font-extrabold text-school-900 dark:text-lousa-100">
          Ajude o projeto!
        </p>
      </div>

      <p class="text-sm text-school-500 dark:text-lousa-400 leading-relaxed">
        O LetMeDoIt é mantido por uma pessoa só, de aluno pra professor.
        Uma doação de qualquer valor ajuda a manter tudo no ar.
      </p>

      <RouterLink
        to="/doar"
        @click="fechar"
        class="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Apoiar agora
        <i class="pi pi-arrow-right text-xs"></i>
      </RouterLink>
    </div>
  </Transition>
</template>

<style scoped>
.support-prompt-enter-active,
.support-prompt-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.support-prompt-enter-from,
.support-prompt-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>
