<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isOpen: boolean;
  enviando: boolean;
  turmaInicial?: { name: string } | null;
}>();

const emit = defineEmits(["close", "confirm"]);
const nomeTurma = ref("");

watch(
  () => props.isOpen,
  (aberto) => {
    if (aberto) {
      nomeTurma.value = props.turmaInicial ? props.turmaInicial.name : "";
    }
  },
);

function handleSubmit() {
  if (!nomeTurma.value.trim()) return;
  emit("confirm", nomeTurma.value);
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-school-900/40 backdrop-blur-sm"
  >
    <div
      class="bg-white dark:bg-school-800 border border-school-200 dark:border-school-700 w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-200"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-school-800 dark:text-school-100">
          {{ turmaInicial ? "Editar" : "Nova" }}
          <span class="text-indigo-600 dark:text-indigo-400">Turma</span>
        </h2>
        <button
          @click="emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-school-400 dark:text-school-500 hover:bg-school-50 dark:hover:bg-school-700 hover:text-school-600 dark:hover:text-school-300 transition-colors"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-xs font-bold text-school-500 dark:text-school-400 uppercase tracking-wider mb-2 px-1">
            Nome da Turma
          </label>
          <input
            v-model="nomeTurma"
            type="text"
            placeholder="Ex: 3º Ano A - Matutino"
            required
            autofocus
            class="w-full bg-school-50/50 dark:bg-school-700/50 border border-school-200 dark:border-school-600 rounded-xl px-4 py-3 text-school-800 dark:text-school-100 placeholder-school-400 dark:placeholder-school-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div class="flex gap-3 pt-2">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 px-4 py-3 rounded-xl bg-school-100 dark:bg-school-700 hover:bg-school-200 dark:hover:bg-school-600 text-school-700 dark:text-school-200 font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="enviando"
            class="flex-1 px-4 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-semibold disabled:opacity-50 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/10"
          >
            <i v-if="enviando" class="pi pi-spin pi-spinner animate-spin"></i>
            {{ enviando ? "Salvando..." : "Confirmar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
