<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  classId: String,
  provas: Array,
});

const emit = defineEmits(["update:modelValue", "download"]);

const hasProvas = computed(() => props.provas && props.provas.length > 0);
</script>

<template>
  <header
    class="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-6"
  >
    <div>
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
        Gerenciar <span class="text-emerald-600 dark:text-emerald-400">Provas</span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Ref. Turma: {{ classId.slice(-5).toUpperCase() }}</p>
    </div>

    <div
      class="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
    >
      <div class="flex items-center gap-3">
        <label class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase ml-2 whitespace-nowrap"
          >Prova Ativa:</label
        >
        <div v-if="hasProvas" class="flex-1 min-w-0">
          <select
            :value="modelValue"
            @change="emit('update:modelValue', $event.target.value)"
            class="bg-transparent text-sm font-bold outline-none text-emerald-600 dark:text-emerald-400 min-w-0 w-full sm:min-w-[200px] cursor-pointer truncate"
          >
            <option value="" disabled>Selecione uma prova...</option>
            <option v-for="prova in provas" :key="prova._id" :value="prova._id">
              {{ prova.title }}
            </option>
          </select>
        </div>
        <p v-else class="text-sm text-slate-400 dark:text-slate-500 font-medium px-2 whitespace-nowrap">
          Nenhuma prova cadastrada
        </p>
      </div>

      <div
        v-if="modelValue"
        class="flex items-center gap-2 w-full sm:w-auto sm:ml-2 sm:border-l border-slate-200 dark:border-slate-700 sm:pl-3 pt-3 sm:pt-0 border-t sm:border-t-0"
      >
        <button
          @click="emit('download', 'pdf')"
          title="Baixar folha de respostas em PDF"
          class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
        >
          <i class="pi pi-file-pdf"></i>
          PDF
        </button>
        <button
          @click="emit('download', 'docx')"
          title="Baixar folha de respostas em Word"
          class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors cursor-pointer"
        >
          <i class="pi pi-file-word"></i>
          Word
        </button>
      </div>
    </div>
  </header>
</template>
