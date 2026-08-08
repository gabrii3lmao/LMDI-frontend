<script setup lang="ts">
import { ref, computed } from "vue";
import type { BillingType } from "@/types/Donation";
import cartaoImg from "@/assets/cartao.png";
import pixImg from "@/assets/pix.png";
import boletoImg from "@/assets/boleto.png";

const emit = defineEmits<{
  (e: "criar", payload: {
    name: string;
    email: string;
    amountCents: number;
    recurring: boolean;
    billingType: BillingType;
    cpfCnpj: string;
  }): void;
}>();

const sugeridos = [5, 15, 30, 50];
const valorSelecionado = ref(15);
const valorCustomizado = ref("");
const usarCustomizado = ref(false);
const recorrente = ref(false);
const billingType = ref<BillingType>("CREDIT_CARD");
const nome = ref("");
const email = ref("");
const cpfCnpj = ref("");
const enviando = ref(false);

const meios: { value: BillingType; label: string; img: string }[] = [
  { value: "CREDIT_CARD", label: "Cartão", img: cartaoImg },
  { value: "PIX", label: "Pix", img: pixImg },
  { value: "BOLETO", label: "Boleto", img: boletoImg },
];

const valorFinal = computed(() => {
  if (usarCustomizado.value) {
    const n = parseFloat(valorCustomizado.value.replace(",", "."));
    if (isNaN(n) || n <= 0) return 0;
    return Math.round(n * 100);
  }
  return valorSelecionado.value * 100;
});

const valorFormatado = computed(() =>
  (valorFinal.value / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }),
);

const podeEnviar = computed(() => {
  if (valorFinal.value < 100 || valorFinal.value > 100000) return false;
  if (nome.value.trim().length < 2) return false;
  if (!/.+@.+\..+/.test(email.value.trim())) return false;
  if (!isValidCpfCnpj(cpfCnpj.value)) return false;
  return true;
});

/** Valida CPF ou CNPJ (inclui dígito verificador). */
function isValidCpfCnpj(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11) return isValidCpf(digits);
  if (digits.length === 14) return isValidCnpj(digits);
  return false;
}

function isValidCpf(cpf: string): boolean {
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

function isValidCnpj(cnpj: string): boolean {
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const calc = (weights: number[]) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) sum += Number(cnpj[i]) * (weights[i] ?? 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  return calc(weights1) === Number(cnpj[12]) && calc(weights2) === Number(cnpj[13]);
}

const erroDocumento = computed(() => {
  if (cpfCnpj.value.length === 0) return "";
  return isValidCpfCnpj(cpfCnpj.value) ? "" : "CPF ou CNPJ inválido";
});

const erroValor = computed(() => {
  if (!usarCustomizado.value) return "";
  const v = valorFinal.value;
  if (v === 0) return "Digite um valor";
  if (v < 100) return "Mínimo de R$ 1,00";
  if (v > 100000) return "Máximo de R$ 1.000,00";
  return "";
});

function selecionarSugerido(v: number) {
  valorSelecionado.value = v;
  usarCustomizado.value = false;
}

function selecionarMeio(t: BillingType) {
  billingType.value = t;
}

function onRecorrente(v: boolean) {
  recorrente.value = v;
}

/** Formata o CPF/CNPJ conforme o usuário digita (000.000.000-00 / 00.000.000/0000-00). */
function formatarCpfCnpj(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function enviar() {
  if (!podeEnviar.value || enviando.value) return;
  enviando.value = true;
  emit("criar", {
    name: nome.value.trim(),
    email: email.value.trim(),
    amountCents: valorFinal.value,
    recurring: recorrente.value,
    billingType: billingType.value,
    cpfCnpj: cpfCnpj.value.trim(),
  });
}

function preencherUsuarioLogado() {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      nome.value = parsed?.name ?? "";
      email.value = parsed?.email ?? "";
    } catch {
      /* ignore */
    }
  }
}

preencherUsuarioLogado();
</script>

<template>
  <div class="space-y-6">
    <!-- Valores sugeridos -->
    <div>
      <p class="text-sm font-semibold text-school-700 mb-3">
        💚 Quanto faz sentido pra você?
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          v-for="v in sugeridos"
          :key="v"
          type="button"
          @click="selecionarSugerido(v)"
          class="py-3 rounded-full text-center font-bold transition-all active:scale-95 border"
          :class="
            !usarCustomizado && valorSelecionado === v
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-school-700 border-school-400 hover:border-indigo-400'
          "
        >
          R$ {{ v }}
        </button>
      </div>

      <!-- Valor livre -->
      <div class="mt-3">
        <label
          class="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all"
          :class="
            usarCustomizado
              ? 'border-indigo-500 bg-indigo-50/60'
              : 'border-school-400 hover:border-borda-500'
          "
        >
          <input
            type="checkbox"
            class="peer sr-only"
            :checked="usarCustomizado"
            @change="usarCustomizado = !usarCustomizado"
          />
          <span
            class="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0"
            :class="
              usarCustomizado
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-school-500'
            "
          >
            <i v-if="usarCustomizado" class="pi pi-check text-xs"></i>
          </span>
          <span class="text-sm text-school-600">
            Outro valor
          </span>
          <input
            v-if="usarCustomizado"
            v-model="valorCustomizado"
            type="text"
            inputmode="decimal"
            placeholder="Ex.: 12,50"
            class="flex-1 min-w-0 px-3 py-1.5 bg-white border border-school-400 rounded-lg text-sm text-school-900 placeholder-school-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-borda-500 transition-all"
            @keydown.enter.prevent="enviar"
          />
        </label>
        <p v-if="erroValor" class="mt-1.5 text-xs text-red-500">
          {{ erroValor }}
        </p>
      </div>
    </div>

    <!-- Recorrente -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-school-700">
          Quero apoiar todo mês
        </p>
        <p class="text-xs text-school-400 mt-0.5">
          Faz a doação virar mensal — me dá previsibilidade pra seguir.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        :aria-checked="recorrente"
        @click="onRecorrente(!recorrente)"
        class="relative w-12 h-7 rounded-full transition-colors shrink-0"
        :class="recorrente ? 'bg-indigo-600' : 'bg-school-200'"
      >
        <span
          class="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all"
          :class="recorrente ? 'left-6' : 'left-1'"
        ></span>
      </button>
    </div>

    <!-- Meio de pagamento -->
    <div>
      <p class="text-sm font-semibold text-school-700 mb-3">
        Como você prefere pagar?
      </p>
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="meio in meios"
          :key="meio.value"
          type="button"
          @click="selecionarMeio(meio.value)"
          class="py-3 rounded-xl flex flex-col items-center gap-1.5 text-sm font-semibold border transition-all active:scale-95"
          :class="
            billingType === meio.value
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-school-600 border-school-400 hover:border-indigo-400'
          "
        >
          <img :src="meio.img" :alt="meio.label" class="w-8 h-8 object-contain" />
          {{ meio.label }}
        </button>
      </div>
    </div>

    <!-- Nome / e-mail / CPF -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-semibold text-school-500 mb-1.5" for="don-nome">
          Seu nome
        </label>
        <input
          id="don-nome"
          v-model="nome"
          type="text"
          autocomplete="name"
          placeholder="Seu nome"
          class="w-full px-4 py-3 bg-school-50/50 border border-school-400 rounded-xl text-school-900 placeholder-school-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-borda-500 outline-none transition-all"
        />
      </div>
      <div>
        <label class="block text-xs font-semibold text-school-500 mb-1.5" for="don-email">
          E-mail
        </label>
        <input
          id="don-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="voce@email.com"
          class="w-full px-4 py-3 bg-school-50/50 border border-school-400 rounded-xl text-school-900 placeholder-school-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-borda-500 outline-none transition-all"
        />
      </div>
      <div class="sm:col-span-2">
        <label class="block text-xs font-semibold text-school-500 mb-1.5" for="don-cpf">
          CPF ou CNPJ <span class="font-normal text-red-400">*</span>
        </label>
        <input
          id="don-cpf"
          :value="cpfCnpj"
          @input="cpfCnpj = formatarCpfCnpj(($event.target as HTMLInputElement).value)"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          placeholder="000.000.000-00"
          class="w-full px-4 py-3 bg-school-50/50 border border-school-400 rounded-xl text-school-900 placeholder-school-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-borda-500 outline-none transition-all"
          :class="erroDocumento ? 'border-red-300' : ''"
        />
        <p v-if="erroDocumento" class="mt-1.5 text-xs text-red-500">
          {{ erroDocumento }}
        </p>
        <p v-else class="mt-1.5 text-xs text-school-400">
          Necessário para o pagamento seguro via ASAAS.
        </p>
      </div>
    </div>

    <!-- CTA -->
    <button
      type="button"
      @click="enviar"
      :disabled="!podeEnviar || enviando"
      class="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <template v-if="enviando">
        <span class="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin"></span>
        Criando cobrança...
      </template>
      <template v-else>
        <span>Quero apoiar com {{ valorFormatado }}</span>
        <i class="pi pi-heart text-sm"></i>
      </template>
    </button>

    <p class="text-center text-sm text-school-500">
      {{
        recorrente
          ? "Um apoio mensal muda muito — obrigado por fazer parte disso. 🙏"
          : "Muito obrigado, de verdade. É assim que esse projeto segue de pé. 🙏"
      }}
    </p>

    <p class="text-center text-xs text-school-400">
      <i class="pi pi-lock mr-1"></i>
      Pagamento seguro gerenciado pelo ASAAS.
    </p>
  </div>
</template>
