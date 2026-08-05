<script setup lang="ts">
import type { Exam } from "@/types/Exam";

defineProps<{
  turmas: any[];
  exams: Exam[];
  selectedClassId: string;
  selectedExamId: string;
  selectedStatus: string;
  loadingTurmas: boolean;
  loadingExams: boolean;
}>();

defineEmits(["update:selectedClassId", "update:selectedExamId", "update:selectedStatus"]);
</script>

<template>
  <div
    class="bg-white dark:bg-school-800 border border-school-200 dark:border-school-700 ring-1 ring-school-300 dark:ring-school-700 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 mb-6 shadow-sm"
  >
    <select
      :value="selectedClassId"
      @change="
        $emit(
          'update:selectedClassId',
          ($event.target as HTMLSelectElement).value,
        )
      "
      :disabled="loadingTurmas"
      class="flex-1 bg-school-50 dark:bg-school-700 border border-school-200 dark:border-school-600 text-school-700 dark:text-school-200 rounded-xl px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
    >
      <option value="" disabled>Selecione a Turma</option>
      <option v-for="t in turmas" :key="t._id" :value="t._id">
        {{ t.name }}
      </option>
    </select>

    <select
      :value="selectedExamId"
      @change="
        $emit(
          'update:selectedExamId',
          ($event.target as HTMLSelectElement).value,
        )
      "
      :disabled="!selectedClassId || loadingExams"
      class="flex-1 bg-school-50 dark:bg-school-700 border border-school-200 dark:border-school-600 text-school-700 dark:text-school-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="" disabled>Selecione a Prova</option>
      <option v-for="e in exams" :key="e._id" :value="e._id">
        {{ e.title }}
      </option>
    </select>

    <select
      :value="selectedStatus"
      @change="
        $emit(
          'update:selectedStatus',
          ($event.target as HTMLSelectElement).value,
        )
      "
      :disabled="!selectedExamId"
      class="flex-1 bg-school-50 dark:bg-school-700 border border-school-200 dark:border-school-600 text-school-700 dark:text-school-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="">Todas</option>
      <option value="pending">Pendente</option>
      <option value="success">Corrigido</option>
      <option value="error">Erro na Leitura</option>
    </select>
  </div>
</template>
