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
      class="group p-6 bg-white dark:bg-lousa-800 border border-school-200 dark:border-lousa-700 hover:border-borda-500/30 hover:shadow-lg cursor-pointer transition-all rounded-3xl"
    >
      <i
        class="pi pi-file-edit text-3xl text-indigo-600 dark:text-indigo-400 mb-4 block transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
      ></i>
      <h3 class="text-xl font-bold mb-1 text-school-800 dark:text-lousa-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Novo Gabarito Oficial</h3>
      <p class="text-xs text-school-500 dark:text-lousa-400 font-medium">
        Configure as respostas corretas para uma nova avaliação.
      </p>
    </div>

    <div
      @click="hasActiveExam ? $emit('open-aluno') : null"
      :class="[
        'group p-6 border rounded-3xl transition-all',
        hasActiveExam
          ? 'bg-white dark:bg-lousa-800 border-school-200 dark:border-lousa-700 hover:border-borda-500/30 hover:shadow-lg cursor-pointer'
          : 'bg-school-100/50 dark:bg-lousa-700/30 border-school-200 dark:border-lousa-700 opacity-40 cursor-not-allowed',
      ]"
    >
      <i
        class="pi pi-camera text-3xl text-indigo-600 dark:text-indigo-400 mb-4 block transition-colors group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
      ></i>
      <h3 class="text-xl font-bold mb-1 text-school-800 dark:text-lousa-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Corrigir Gabarito Aluno</h3>
      <p class="text-xs text-school-500 dark:text-lousa-400 font-medium">
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
