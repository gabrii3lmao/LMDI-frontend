<script setup lang="ts">
import { computed } from "vue";

// Adicionamos a tipagem completa do Template para facilitar o envio no evento de edição
interface TemplateType {
  _id: string;
  title: string;
  questionsCount: number;
  choicesCount: number;
  classId: string;
}

const props = defineProps<{
  template: TemplateType;
  turmaName: string;
}>();

// Definindo os eventos que este componente vai emitir para o pai
const emit = defineEmits<{
  (e: "edit", template: TemplateType): void;
  (e: "delete", id: string): void;
}>();

const idRef = computed(() => props.template._id.slice(-5));
const alternativasLetra = computed(() =>
  String.fromCharCode(64 + props.template.choicesCount),
);
</script>

<template>
  <div
    class="group bg-white dark:bg-lousa-800 border border-school-200 dark:border-lousa-700 ring-1 ring-school-100 dark:ring-lousa-700 p-4 rounded-2xl hover:ring-indigo-500/30 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
  >
    <!-- Topo do card (Margem reduzida de mb-6 para mb-3) -->
    <div class="flex justify-between items-start mb-3">
      <div class="flex gap-3 items-center">
        <!-- Ícone menor (w-10 h-10 em vez de w-12 h-12) -->
        <div
          class="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
        >
          <i class="pi pi-file-check" style="font-size: 1.3rem"></i>
        </div>

        <div
          class="flex gap-3 ml-2 opacity-100 group-hover:opacity-100 transition-opacity"
        >
          <button
            @click="emit('edit', template)"
            class="p-1.5 text-school-600 dark:text-lousa-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-school-50 dark:hover:bg-lousa-700"
            title="Editar Gabarito"
          >
            <i class="pi pi-pencil" style="font-size: 1.1rem"></i>
          </button>

          <button
            @click="emit('delete', template._id)"
            class="p-1.5 text-school-600 dark:text-lousa-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Deletar Gabarito"
          >
            <i class="pi pi-trash" style="font-size: 1.1rem"></i>
          </button>
        </div>  
      </div>

      <!-- Badge de turma com padding vertical ligeiramente menor -->
      <div
        class="bg-school-50 dark:bg-lousa-700 border border-school-200 dark:border-lousa-600 px-3 py-1 rounded-lg max-w-[150px]"
      >
        <p
          class="text-xs font-semibold text-school-600 dark:text-lousa-300 truncate"
          :title="turmaName"
        >
          {{ turmaName }}
        </p>
      </div>
    </div>

    <!-- Título -->
    <div class="mb-4">
      <h3
        class="text-base font-bold text-school-800 dark:text-lousa-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
      >
        {{ template.title }}
      </h3>
      <p
        class="text-[11px] text-school-400 dark:text-lousa-500 mt-1 font-mono uppercase tracking-wider"
      >
        REF: #{{ idRef }}
      </p>
    </div>

    <!-- Estatísticas inferiores -->
    <div class="flex gap-2">
      <div
        class="flex-1 bg-school-50 dark:bg-lousa-700/50 border border-school-100 dark:border-lousa-600 ring-1 ring-school-100 dark:ring-lousa-700 px-3 py-2 rounded-xl flex flex-col items-center justify-center"
      >
        <span
          class="text-indigo-600 dark:text-indigo-400 font-extrabold text-base leading-none mb-1"
          >{{ template.questionsCount }}</span
        >
        <span
          class="text-[9px] text-school-500 dark:text-lousa-400 uppercase font-bold tracking-wider"
          >Questões</span
        >
      </div>
      <div
        class="flex-1 bg-school-50 dark:bg-lousa-700/50 border border-school-100 dark:border-lousa-600 ring-1 ring-school-100 dark:ring-lousa-700 px-3 py-2 rounded-xl flex flex-col items-center justify-center"
      >
        <span
          class="text-indigo-600 dark:text-indigo-400 font-extrabold text-base leading-none mb-1"
          >A-{{ alternativasLetra }}</span
        >
        <span
          class="text-[9px] text-school-500 dark:text-lousa-400 uppercase font-bold tracking-wider"
          >Alternativas</span
        >
      </div>
    </div>
  </div>
</template>
