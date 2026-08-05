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
    class="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-school-200 dark:border-school-700 pb-6"
  >
    <div>
      <h1 class="text-3xl font-extrabold text-school-800 dark:text-school-100 tracking-tight">
        Gerenciar <span class="text-indigo-600 dark:text-indigo-400">Provas</span>
      </h1>
      <p class="text-school-500 dark:text-school-400 text-sm mt-1">Ref. Turma: {{ classId.slice(-5).toUpperCase() }}</p>
    </div>

    <div
      class="bg-white dark:bg-school-800 p-2.5 rounded-xl border border-school-200 dark:border-school-700 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3"
    >
      <div class="flex items-center gap-3">
        <label class="text-[10px] font-bold text-school-500 dark:text-school-400 uppercase ml-2 whitespace-nowrap"
          >Prova Ativa:</label
        >
        <div v-if="hasProvas" class="flex-1 min-w-0">
          <select
            :value="modelValue"
            @change="emit('update:modelValue', $event.target.value)"
            class="bg-transparent text-sm font-bold outline-none text-indigo-600 dark:text-indigo-400 min-w-0 w-full sm:min-w-[200px] cursor-pointer truncate"
          >
            <option value="" disabled>Selecione uma prova...</option>
            <option v-for="prova in provas" :key="prova._id" :value="prova._id">
              {{ prova.title }}
            </option>
          </select>
        </div>
        <p v-else class="text-sm text-school-400 dark:text-school-500 font-medium px-2 whitespace-nowrap">
          Nenhuma prova cadastrada
        </p>
      </div>

      <div
        v-if="modelValue"
        class="flex items-center gap-2 w-full sm:w-auto sm:ml-2 sm:border-l border-school-200 dark:border-school-700 sm:pl-3 pt-3 sm:pt-0 border-t sm:border-t-0"
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
          class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
        >
          <i class="pi pi-file-word"></i>
          Word
        </button>
        <button
          @click="emit('download', 'image')"
          title="Baixar folha de respostas como imagem"
          class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-2.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
        >
          <i class="pi pi-image"></i>
          Imagem
        </button>
      </div>
    </div>
  </header>
</template>
