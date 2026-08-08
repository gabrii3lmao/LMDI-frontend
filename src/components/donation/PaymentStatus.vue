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

const confetes = Array.from({ length: 12 }, (_, i) => i + 1);
</script>

<template>
  <div class="py-8 flex flex-col items-center text-center">
    <!-- Aguardando pagamento -->
    <template v-if="step === 'aguardando'">
      <div class="relative w-16 h-16 mb-5">
        <div
          class="absolute inset-0 rounded-full border-4 border-emerald-400"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin"
        ></div>
      </div>
      <h3 class="text-xl font-bold text-school-900 mb-2">
        Aguardando pagamento
      </h3>
      <p class="text-sm text-school-500 max-w-sm leading-relaxed">
        Sua doação de <strong class="text-school-800">{{ valorFormatado }}</strong>
        está sendo processada. Assim que confirmarmos, mostramos o recibo aqui.
      </p>
      <p class="text-xs text-school-400 mt-4">
        Você também pode conferir o status nesta mesma página em instantes.
      </p>
    </template>

    <!-- Sucesso -->
    <template v-else-if="step === 'sucesso'">
      <div class="don-sucesso-enter relative w-20 h-20 mb-6 mx-auto">
        <span
          v-for="n in confetes"
          :key="n"
          class="don-confete"
          :class="`don-confete-${n}`"
        ></span>
        <div
          class="don-coracao w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-md"
        >
          <i class="pi pi-heart text-white text-3xl"></i>
        </div>
      </div>
      <h3 class="don-fade text-2xl font-extrabold text-school-900 mb-2">
        Recebido! Muito obrigado por apoiar 💚
      </h3>
      <p class="don-fade text-sm text-school-500 max-w-sm leading-relaxed">
        Recebemos sua doação de
        <strong class="text-school-800">{{ valorFormatado }}</strong>.
        <template v-if="recurring">
          Sua contribuição mensal está ativa — a partir de agora você é parte
          disso todo mês, e isso muda muito pra mim.
        </template>
        <template v-else>
          É com apoios assim que o LetMeDoIt continua no ar. Obrigado de coração.
        </template>
      </p>
      <button
        type="button"
        @click="emit('voltar')"
        class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
      >
        Fazer outra doação
        <i class="pi pi-arrow-right text-sm"></i>
      </button>
    </template>

    <!-- Erro -->
    <template v-else>
      <div
        class="w-16 h-16 mb-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center"
      >
        <i class="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <h3 class="text-xl font-bold text-school-900 mb-2">
        Não foi possível concluir
      </h3>
      <p class="text-sm text-school-500 max-w-sm leading-relaxed">
        {{ erroMsg || "Algo deu errado com o seu pagamento. Nenhum valor foi cobrado." }}
      </p>
      <button
        type="button"
        @click="emit('voltar')"
        class="mt-6 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
      >
        Tentar novamente
      </button>
    </template>
  </div>
</template>

<style scoped>
.don-sucesso-enter {
  animation: don-fade 0.5s ease both;
}
.don-fade {
  animation: don-fade 0.6s 0.15s ease both;
}
@keyframes don-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.don-coracao {
  animation: don-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes don-pop {
  0% {
    transform: scale(0.4);
    opacity: 0;
  }
  60% {
    transform: scale(1.12);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.don-confete {
  position: absolute;
  left: 50%;
  top: 2.1rem;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  opacity: 0;
  animation: don-confete 1.5s ease-out forwards;
  pointer-events: none;
}
@keyframes don-confete {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(0.6);
  }
  12% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx, -40px), 64px) rotate(var(--rot, 360deg)) scale(0.9);
  }
}

.don-confete-1 { background: #4ade80; --dx: -56px; --rot: 200deg;  animation-delay: 0s; }
.don-confete-2 { background: #facc15; --dx: -36px; --rot: -180deg; animation-delay: 0.08s; }
.don-confete-3 { background: #f472b6; --dx: -16px; --rot: 160deg;  animation-delay: 0.02s; }
.don-confete-4 { background: #a78bfa; --dx: 8px;   --rot: 210deg;  animation-delay: 0.1s; }
.don-confete-5 { background: #fbbf24; --dx: 22px;  --rot: -200deg; animation-delay: 0.05s; }
.don-confete-6 { background: #10b981; --dx: 40px;  --rot: 190deg;  animation-delay: 0.13s; }
.don-confete-7 { background: #f87171; --dx: 58px;  --rot: -170deg; animation-delay: 0.03s; }
.don-confete-8 { background: #60a5fa; --dx: -70px; --rot: -240deg; animation-delay: 0.12s; }
.don-confete-9 { background: #c084fc; --dx: 70px;  --rot: 240deg;  animation-delay: 0.07s; }
.don-confete-10 { background: #fda4af; --dx: -20px; --rot: 170deg; animation-delay: 0.15s; }
.don-confete-11 { background: #86efac; --dx: 16px;  --rot: -190deg; animation-delay: 0.09s; }
.don-confete-12 { background: #fb7185; --dx: -6px;  --rot: 200deg;  animation-delay: 0.04s; }
</style>
