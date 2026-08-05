<script setup lang="ts">
import { ref, watch } from "vue";
import type { Submission, SubmissionDetail } from "@/types/Submission";

const props = defineProps<{
  isOpen: boolean;
  submission: Submission | null;
  saving: boolean;
}>();

const emit = defineEmits<{
  close: [];
  save: [data: {
    studentName: string;
    score: number | undefined;
    totalCorrect: number | undefined;
    details: SubmissionDetail[] | undefined;
  }];
}>();

const studentName = ref("");
const score = ref<number | undefined>();
const totalCorrect = ref<number | undefined>();
const details = ref<SubmissionDetail[]>([]);

watch(
  () => props.submission,
  (sub) => {
    if (sub) {
      studentName.value = sub.studentName;
      score.value = sub.score;
      totalCorrect.value = sub.totalCorrect;
      details.value = sub.details ? JSON.parse(JSON.stringify(sub.details)) : [];
    }
  },
  { immediate: true },
);

function addDetail() {
  details.value.push({
    question: details.value.length + 1,
    marked: null,
    correct: "",
    status: "correct",
  });
}

function removeDetail(index: number) {
  details.value.splice(index, 1);
}

function handleSave() {
  emit("save", {
    studentName: studentName.value,
    score: score.value,
    totalCorrect: totalCorrect.value,
    details: details.value.length > 0 ? details.value : undefined,
  });
}
</script>

<template>
  <div
    v-if="isOpen && submission"
    class="fixed inset-0 z-50 overflow-y-auto"
  >
    <div
      class="fixed inset-0 bg-school-900/40 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div
      class="relative min-h-screen flex items-center justify-center p-4"
    >
      <div
        class="relative bg-white dark:bg-lousa-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-school-200 dark:border-lousa-700 max-h-[90vh] flex flex-col"
      >
        <div
          class="p-6 border-b border-school-200 dark:border-lousa-700 flex justify-between items-center shrink-0"
        >
          <h2 class="text-xl font-bold text-school-800 dark:text-lousa-100">
            Editar Submissão
          </h2>
          <button
            @click="$emit('close')"
            class="text-school-400 dark:text-lousa-500 hover:text-school-600 dark:hover:text-lousa-300 p-2 transition-colors hover:bg-school-50 dark:hover:bg-lousa-700 rounded-lg"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <label
              class="block text-sm font-bold text-school-600 dark:text-lousa-400 mb-1.5 uppercase tracking-wider"
            >
              Nome do Aluno
            </label>
            <input
              v-model="studentName"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-sm font-bold text-school-600 dark:text-lousa-400 mb-1.5 uppercase tracking-wider"
              >
                Nota (0-10)
              </label>
              <input
                v-model.number="score"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="w-full px-4 py-2.5 rounded-xl border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
              />
            </div>
            <div>
              <label
                class="block text-sm font-bold text-school-600 dark:text-lousa-400 mb-1.5 uppercase tracking-wider"
              >
                Total de Acertos
              </label>
              <input
                v-model.number="totalCorrect"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-xl border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <label
                class="text-sm font-bold text-school-600 dark:text-lousa-400 uppercase tracking-wider"
              >
                Respostas (Detalhes)
              </label>
              <button
                @click="addDetail"
                class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
              >
                <i class="pi pi-plus text-xs"></i>
                Adicionar questão
              </button>
            </div>

            <div
              v-if="details.length === 0"
              class="text-center p-6 bg-school-50 dark:bg-lousa-700/30 rounded-xl border border-dashed border-school-300 dark:border-lousa-600"
            >
              <p class="text-sm text-school-500 dark:text-lousa-400 font-medium">
                Nenhum detalhe de questão registrado.
              </p>
            </div>

            <div
              v-for="(det, index) in details"
              :key="index"
              class="flex items-start gap-3 p-3 mb-2 bg-school-50 dark:bg-lousa-700/30 rounded-xl border border-school-200 dark:border-lousa-600"
            >
              <div class="w-10 shrink-0 pt-1">
                <span
                  class="text-xs font-bold text-school-500 dark:text-lousa-400 bg-school-200 dark:bg-lousa-600 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  {{ det.question }}
                </span>
              </div>

              <div class="flex-1 grid grid-cols-3 gap-2">
                <div>
                  <label
                    class="block text-[10px] font-bold text-school-500 dark:text-lousa-400 uppercase mb-1"
                  >
                    Marcada
                  </label>
                  <input
                    v-model="det.marked"
                    type="text"
                    class="w-full px-2.5 py-1.5 rounded-lg border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block text-[10px] font-bold text-school-500 dark:text-lousa-400 uppercase mb-1"
                  >
                    Correta
                  </label>
                  <input
                    v-model="det.correct"
                    type="text"
                    class="w-full px-2.5 py-1.5 rounded-lg border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block text-[10px] font-bold text-school-500 dark:text-lousa-400 uppercase mb-1"
                  >
                    Status
                  </label>
                  <select
                    v-model="det.status"
                    class="w-full px-2.5 py-1.5 rounded-lg border border-school-300 dark:border-lousa-600 bg-white dark:bg-lousa-700 text-school-800 dark:text-lousa-100 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-borda-500 outline-none transition-all"
                  >
                    <option value="correct">Correto</option>
                    <option value="incorrect">Incorreto</option>
                    <option value="invalid">Inválido</option>
                  </select>
                </div>
              </div>

              <button
                @click="removeDetail(index)"
                class="p-1.5 mt-5 rounded-lg text-school-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all shrink-0"
                title="Remover questão"
              >
                <i class="pi pi-trash text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          class="p-6 border-t border-school-200 dark:border-lousa-700 flex justify-end gap-3 shrink-0"
        >
          <button
            @click="$emit('close')"
            class="px-5 py-2.5 rounded-xl border border-school-300 dark:border-lousa-600 text-school-700 dark:text-lousa-300 font-semibold text-sm hover:bg-school-50 dark:hover:bg-lousa-700 transition-all"
          >
            Cancelar
          </button>
          <button
            @click="handleSave"
            :disabled="saving"
            class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <i v-if="saving" class="pi pi-spin pi-spinner text-sm"></i>
            {{ saving ? "Salvando..." : "Salvar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
