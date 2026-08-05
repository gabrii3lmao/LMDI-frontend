<script setup lang="ts">
import { computed } from "vue";

interface Turma {
  _id: string;
  name: string;
}

const props = defineProps<{ turma: Turma }>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
  (e: "edit", turma: Turma): void;
}>();

const avatarInitials = computed(() => {
  const name = props.turma.name.trim();

  const words = name.split(/\s+/);

  if (words.length >= 2 && words[0] && words[1]) {
    return (words[0][0]! + words[1][0]).toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
});

const shortCode = computed(() => props.turma._id.slice(-5).toUpperCase());
</script>

<template>
  <div
  class="aspect-[2/1] w-full group bg-white dark:bg-lousa-800 border border-school-200 dark:border-lousa-700 ring-2 ring-school-100 dark:ring-lousa-700 rounded-2xl p-4 hover:ring-indigo-500/30 hover:border-borda-300 dark:hover:border-borda-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <!-- Avatar -->
      <div
        class="h-10 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-base rounded-xl flex items-center gap-2 px-3 group-hover:scale-105 transition-transform"
      >
        <i class="pi pi-users text-indigo-500 dark:text-indigo-400 text-sm"></i>

        {{ avatarInitials }}
      </div>

      <!-- Actions -->
      <div
        class="flex gap-2 ml-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
      >
        <button
          @click="emit('edit', props.turma)"
          class="p-2 text-school-600 dark:text-lousa-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-school-100 dark:hover:bg-lousa-700 rounded-lg transition-colors"
          title="Editar Turma"
        >
          <i class="pi pi-pencil text-sm"></i>
        </button>

        <button
          @click="emit('delete', props.turma._id)"
          class="p-2 text-school-600 dark:text-lousa-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Excluir Turma"
        >
          <i class="pi pi-trash text-sm"></i>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="mb-5">
      <h3
        class="text-lg font-bold text-school-800 dark:text-lousa-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2"
      >
        {{ props.turma.name }}
      </h3>

      <p
        class="text-[11px] text-school-400 dark:text-lousa-500 mt-1 font-mono uppercase tracking-wider"
      >
        REF: #{{ shortCode }}
      </p>
    </div>

    <!-- Footer -->
    <RouterLink
      :to="`/classes/${props.turma._id}`"
      class="w-full bg-school-50 dark:bg-lousa-700 border border-school-200 dark:border-lousa-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-school-600 dark:text-lousa-300 hover:text-white text-sm font-semibold py-2 px-4 rounded-xl hover:border-transparent transition-all flex justify-center items-center gap-2"
    >
      Acessar Turma

      <i
        class="pi pi-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"
      ></i>
    </RouterLink>
  </div>
</template>
