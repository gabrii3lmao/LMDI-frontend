<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  step: "aguardando" | "sucesso" | "erro";
  amountCents: number;
  recurring: boolean;
  erroMsg?: string;
}>();

const emit = defineEmits<{
  (e: "voltar"): void;
}>();

const valorFormatado = computed(() =>
  (props.amountCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
);
</script>

<template>
  <div class="py-8 flex flex-col items-center text-center">
    <!-- Aguardando pagamento -->
    <template v-if="step === 'aguardando'">
      <div class="relative w-16 h-16 mb-5">
        <div
          class="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-lousa-600"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"
        ></div>
      </div>
      <h3 class="text-xl font-bold text-school-900 dark:text-lousa-100 mb-2">
        Aguardando pagamento
      </h3>
      <p class="text-sm text-school-500 dark:text-lousa-400 max-w-sm leading-relaxed">
        Sua doação de <strong class="text-school-800 dark:text-lousa-200">{{ valorFormatado }}</strong>
        está sendo processada. Assim que confirmarmos, mostramos o recibo aqui.
      </p>
      <p class="text-xs text-school-400 dark:text-lousa-500 mt-4">
        Você também pode conferir o status nesta mesma página em instantes.
      </p>
    </template>

    <!-- Sucesso -->
    <template v-else-if="step === 'sucesso'">
      <div
        class="w-16 h-16 mb-5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-600/30"
      >
        <i class="pi pi-check text-white text-2xl"></i>
      </div>
      <h3 class="text-2xl font-extrabold text-school-900 dark:text-lousa-100 mb-2">
        Muito obrigado! 💚
      </h3>
      <p class="text-sm text-school-500 dark:text-lousa-400 max-w-sm leading-relaxed">
        Recebemos sua doação de
        <strong class="text-school-800 dark:text-lousa-200">{{ valorFormatado }}</strong>.
        <template v-if="recurring">
          Sua contribuição mensal está ativa — obrigado por apoiar o projeto todo mês.
        </template>
        <template v-else>
          É com apoios assim que o LetMeDoIt continua no ar.
        </template>
      </p>
      <button
        type="button"
        @click="emit('voltar')"
        class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-600/10 active:scale-95"
      >
        Fazer outra doação
        <i class="pi pi-arrow-right text-sm"></i>
      </button>
    </template>

    <!-- Erro -->
    <template v-else>
      <div
        class="w-16 h-16 mb-5 rounded-full bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center justify-center"
      >
        <i class="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <h3 class="text-xl font-bold text-school-900 dark:text-lousa-100 mb-2">
        Não foi possível concluir
      </h3>
      <p class="text-sm text-school-500 dark:text-lousa-400 max-w-sm leading-relaxed">
        {{ erroMsg || "Algo deu errado com o seu pagamento. Nenhum valor foi cobrado." }}
      </p>
      <button
        type="button"
        @click="emit('voltar')"
        class="mt-6 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-600/10 active:scale-95"
      >
        Tentar novamente
      </button>
    </template>
  </div>
</template>
