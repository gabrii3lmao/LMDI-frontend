<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { useToast } from "primevue/usetoast";
import type { Submission } from "@/types/Submission";
import { submissionService } from "@/services/submissionService";
import SubmissionCard from "./SubmissionCard.vue";
import SubmissionDrawer from "./SubmissionDrawer.vue";
import SubmissionHoverPreview from "./SubmissionHoverPreview.vue";

defineProps<{
  examId: string;
  submissoes: Submission[];
}>();

const toast = useToast();

const selectedSubmission = ref<Submission | null>(null);
const isDrawerOpen = ref(false);

const hovered = ref<{ sub: Submission; el: HTMLElement } | null>(null);
let hoverTimer: ReturnType<typeof setTimeout> | null = null;

const supportsHover =
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

function onHoverEnter(sub: Submission, el: HTMLElement) {
  if (!supportsHover) return;
  if (hoverTimer) clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => {
    hovered.value = { sub, el };
  }, 150);
}

function onHoverLeave() {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
  hovered.value = null;
}

async function openDetails(sub: Submission) {
  hovered.value = null;
  selectedSubmission.value = { ...sub, answers: null };
  isDrawerOpen.value = true;

  try {
    const res = await submissionService.getSubmissionAnswers(sub._id);
    if (selectedSubmission.value) {
      selectedSubmission.value.answers = res.data.answers;
    }
  } catch {
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Não foi possível carregar os detalhes do aluno.",
      life: 4000,
    });
    isDrawerOpen.value = false;
  }
}

onUnmounted(() => {
  if (hoverTimer) {
    clearTimeout(hoverTimer);
    hoverTimer = null;
  }
});
</script>

<template>
  <section>
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
      <i class="pi pi-users text-emerald-600 dark:text-emerald-400"></i>
      Alunos Processados
    </h3>

    <div
      v-if="!examId"
      class="bg-white dark:bg-slate-800 border border-dashed border-slate-400/60 dark:border-slate-600 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 font-semibold shadow-sm"
    >
      Selecione uma prova acima para visualizar o desempenho da turma.
    </div>

    <div
      v-else-if="submissoes.length === 0"
      class="bg-white dark:bg-slate-800 border border-dashed border-slate-400/60 dark:border-slate-600 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 font-semibold shadow-sm"
    >
      Nenhuma submissão encontrada para esta prova.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SubmissionCard
        v-for="sub in submissoes"
        :key="sub._id"
        :submissao="sub"
        @details="openDetails"
        @hover-enter="onHoverEnter"
        @hover-leave="onHoverLeave"
      />
    </div>

    <Teleport to="body">
      <SubmissionHoverPreview
        v-if="hovered"
        :submission="hovered.sub"
        :anchor="hovered.el"
      />
    </Teleport>

    <SubmissionDrawer
      :submission="selectedSubmission"
      :exam="null"
      :open="isDrawerOpen"
      @close="isDrawerOpen = false"
    />
  </section>
</template>
