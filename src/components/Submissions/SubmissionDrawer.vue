<script setup lang="ts">
defineProps<{
  submission: any;
  exam: any;
  open: boolean;
}>();

defineEmits(["close"]);
</script>

<template>
  <div v-if="open && submission" class="fixed inset-0 z-50 overflow-hidden">
    <div
      class="absolute inset-0 bg-school-900/40 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div
      class="absolute inset-y-0 right-0 w-full max-w-md bg-white dark:bg-school-800 shadow-2xl flex flex-col border-l border-school-400/60 dark:border-school-700 animate-in slide-in-from-right duration-300"
    >
      <div
        class="p-6 border-b border-school-400/60 dark:border-school-700 flex justify-between items-center"
      >
        <h2 class="text-xl font-bold text-school-800 dark:text-school-100">
          {{ submission.studentName }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-school-400 dark:text-school-500 hover:text-school-600 dark:hover:text-school-300 p-2 transition-colors hover:bg-school-50 dark:hover:bg-school-700 rounded-lg"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="p-6 flex-1 overflow-y-auto">
        <div
          class="p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl mb-6 flex items-center justify-between shadow-sm"
        >
          <span
            class="text-indigo-700 dark:text-indigo-300 font-bold uppercase text-xs tracking-wider"
            >Nota Final:</span
          >
          <span class="text-2xl font-extrabold text-indigo-800 dark:text-indigo-200">
            {{ submission.score ?? "-" }}
          </span>
        </div>

        <div v-if="submission.imageUrl" class="mb-6">
          <h3
            class="text-xs font-bold text-school-400 dark:text-school-500 uppercase tracking-wider mb-3 px-1"
          >
            Imagem Original
          </h3>
          <a
            :href="submission.imageUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-xl overflow-hidden ring-1 ring-school-200 dark:ring-school-700 border border-school-100 dark:border-school-700 shadow-sm hover:ring-indigo-400/50 transition-all"
          >
            <img
              :src="submission.imageUrl"
              alt="Cartão-resposta do aluno"
              class="w-full h-auto object-contain"
            />
          </a>
        </div>

        <h3
          class="text-xs font-bold text-school-400 dark:text-school-500 uppercase tracking-wider mb-3 px-1"
        >
          Respostas Lidas
        </h3>

        <div v-if="!submission.answers" class="flex justify-center p-8">
          <i class="pi pi-spin pi-spinner text-2xl text-indigo-600 dark:text-indigo-400"></i>
        </div>

        <div v-else class="rounded-xl overflow-hidden ring-1 ring-school-200 dark:ring-school-700 border border-school-100 dark:border-school-700 shadow-sm bg-white dark:bg-school-800">
          <table class="w-full text-left border-collapse">
            <thead class="bg-school-50 dark:bg-school-700 border-b border-school-200 dark:border-school-600">
              <tr>
                <th
                  class="px-5 py-3 text-xs font-bold text-school-500 dark:text-school-400 uppercase tracking-wider"
                >
                  Questão
                </th>
                <th
                  class="px-5 py-3 text-xs font-bold text-school-500 dark:text-school-400 uppercase tracking-wider"
                >
                  Alternativa Marcada
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-school-100 dark:divide-school-700 bg-white dark:bg-school-800">
              <tr
                v-for="(answer, questionNumber) in submission.answers"
                :key="questionNumber"
                class="hover:bg-school-50/50 dark:hover:bg-school-700/30"
              >
                <td class="px-5 py-3 text-sm text-school-600 dark:text-school-400 font-semibold">
                  {{ Number(questionNumber) + 1 }}
                </td>
                <td class="px-5 py-3 text-sm">
                  <span v-if="answer" class="text-school-800 dark:text-school-100 font-bold">{{
                    answer
                  }}</span>
                  <span v-else class="text-school-400 dark:text-school-500 italic font-medium">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="
            submission.answers && Object.keys(submission.answers).length === 0
          "
          class="text-center p-6 text-sm text-school-500 dark:text-school-400 font-medium"
        >
          Nenhuma resposta processada para este aluno.
        </div>
      </div>
    </div>
  </div>
</template>
