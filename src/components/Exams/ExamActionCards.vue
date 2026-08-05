<script setup>
defineProps({
  hasActiveExam: Boolean,
});

defineEmits(["open-gabarito", "open-aluno"]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
    <div
      @click="$emit('open-gabarito')"
      class="group p-6 bg-white dark:bg-school-800 border border-school-200 dark:border-school-700 hover:border-indigo-500/30 hover:shadow-lg cursor-pointer transition-all rounded-3xl"
    >
      <div
        class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm"
      >
        <i class="pi pi-file-edit text-xl"></i>
      </div>
      <h3 class="text-xl font-bold mb-1 text-school-800 dark:text-school-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Novo Gabarito Oficial</h3>
      <p class="text-xs text-school-500 dark:text-school-400 font-medium">
        Configure as respostas corretas para uma nova avaliação.
      </p>
    </div>

    <div
      @click="hasActiveExam ? $emit('open-aluno') : null"
      :class="[
        'group p-6 border rounded-3xl transition-all',
        hasActiveExam
          ? 'bg-white dark:bg-school-800 border-school-200 dark:border-school-700 hover:border-indigo-500/30 hover:shadow-lg cursor-pointer'
          : 'bg-school-100/50 dark:bg-school-700/30 border-school-200 dark:border-school-700 opacity-40 cursor-not-allowed',
      ]"
    >
      <div
        class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm"
      >
        <i class="pi pi-camera text-xl"></i>
      </div>
      <h3 class="text-xl font-bold mb-1 text-school-800 dark:text-school-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Corrigir Gabarito Aluno</h3>
      <p class="text-xs text-school-500 dark:text-school-400 font-medium">
        Suba a foto da prova para correção automática por IA.
      </p>
    </div>
  </div>
</template>

<style scoped>
.group {
  transition: all 0.3s ease;
}
</style>
