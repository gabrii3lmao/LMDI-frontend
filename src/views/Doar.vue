<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import logLight from "@/assets/logo1.webp";
import logDark from "@/assets/logo-white.png";
import { donationService } from "@/services/donationService";
import type { BillingType } from "@/types/Donation";
import DonationCard from "@/components/donation/DonationCard.vue";
import PaymentStatus from "@/components/donation/PaymentStatus.vue";

type Step = "form" | "aguardando" | "sucesso" | "erro";

const route = useRoute();

// Esta página é sempre light: remove o tema escuro do documento enquanto
// estiver aberta e restaura ao sair.
let tinhaDark = false;
function forcarLight() {
  const root = document.documentElement;
  tinhaDark = root.classList.contains("my-app-dark");
  root.classList.remove("dark", "my-app-dark");
}
function restaurarTema() {
  if (tinhaDark) document.documentElement.classList.add("dark", "my-app-dark");
}

// ────────────────────────── máquina de estados ──────────────────────────
const step = ref<Step>("form");
const erroMsg = ref("");
const donationId = ref<string | null>(null);
const pagamento = ref<{
  amountCents: number;
  recurring: boolean;
  name: string;
  email: string;
  billingType: BillingType;
} | null>(null);

let pollTimer: ReturnType<typeof setInterval> | null = null;
let pollTries = 0;

const statusErrorMsg: Record<string, string> = {
  failed: "O pagamento não pôde ser concluído. Nenhum valor foi cobrado.",
  expired: "O tempo para realizar o pagamento expirou.",
  cancelled: "O pagamento foi cancelado.",
};

function pararPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  pollTries = 0;
}

function comecarPolling(id: string) {
  pararPolling();
  step.value = "aguardando";
  pollTries = 0;

  pollTimer = setInterval(async () => {
    pollTries += 1;
    try {
      const { data } = await donationService.consultarDoacao(id);
      if (data.status === "paid") {
        pararPolling();
        step.value = "sucesso";
      } else if (["failed", "expired", "cancelled"].includes(data.status)) {
        pararPolling();
        erroMsg.value = statusErrorMsg[data.status] ?? "";
        step.value = "erro";
      }
    } catch {
      /* rede instável — continua tentando */
    }

    if (pollTries >= 40) pararPolling();
  }, 2500);
}

async function criarDoacao(payload: {
  name: string;
  email: string;
  amountCents: number;
  recurring: boolean;
  billingType: BillingType;
  cpfCnpj: string;
}) {
  erroMsg.value = "";
  try {
    const { data } = await donationService.criarDoacao(payload);
    donationId.value = data.id;
    localStorage.setItem("lastDonationId", data.id);
    pagamento.value = payload;

    // Toda cobrança gera uma `paymentUrl` (página hospedada do ASAAS no
    // sandbox). Abre em nova aba para a aba atual ficar em "Aguardando
    // pagamento" com polling; se o popup for bloqueado, cai para o redirect
    // (o retorno via onMounted retoma o polling).
    if (data.paymentUrl) {
      comecarPolling(data.id);
      const win = window.open(data.paymentUrl, "_blank");
      if (!win) window.location.assign(data.paymentUrl);
      return;
    }

    // Sem paymentUrl (pagamento já confirmado de outra forma) → aguardando.
    comecarPolling(data.id);
  } catch (error: any) {
    erroMsg.value =
      error?.response?.data?.message ||
      "Não foi possível criar a doação. Tente novamente.";
    step.value = "erro";
  }
}

function voltarParaForm() {
  pararPolling();
  donationId.value = null;
  erroMsg.value = "";
  step.value = "form";
}

// Ao voltar da página de pagamento do ASAAS (success_url), retoma o fluxo.
onMounted(async () => {
  forcarLight();

  const query = route.query.pagamento as string | undefined;
  const lastId = localStorage.getItem("lastDonationId");

  if (query === "sucesso" && lastId) {
    const history = window.history;
    history.replaceState({}, "", "/doar");
    comecarPolling(lastId);
  } else if (query === "cancelado") {
    const history = window.history;
    history.replaceState({}, "", "/doar");
    step.value = "form";
  }
});

onUnmounted(() => {
  pararPolling();
  restaurarTema();
});
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <!-- Hero -->
    <section class="pt-16 pb-14 md:pt-20 md:pb-12">
      <div class="max-w-2xl mx-auto px-6 text-center space-y-6">
        <div
          class="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-2 border-emerald-400 shadow-sm flex items-center justify-center overflow-hidden p-2"
        >
          <img :src="logLight" alt="LetMeDoIt" class="w-full h-full object-contain" />
        </div>

        <div>
          <h1 class="font-display text-3xl md:text-[2.75rem] font-extrabold text-school-900 tracking-tight leading-tight">
            Isso significa muito, sério —
            <span class="text-emerald-600">valeu por pensar em mim</span>
          </h1>
          <p class="mt-4 text-base md:text-lg text-school-500 max-w-xl mx-auto leading-relaxed">
            A sua ajuda seria muito gratificante pra mim, sério.
            Você ajuda a manter o projeto no ar e me dá energia pra
            continuar melhorando. A conta da IA chega cara, sabia?
          </p>
          <ul class="mt-6 flex flex-wrap items-center justify-center gap-2">
            <li class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-sm font-medium text-emerald-800">
              🖥️ Hospedagem
            </li>
            <li class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-sm font-medium text-emerald-800">
              ⏰ Tempo de desenvolvimento
            </li>
            <li class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-sm font-medium text-emerald-800">
              💚 Energia pra seguir
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Card de doação -->
    <section class="pb-20 md:pb-24">
      <div class="max-w-xl mx-auto px-4 sm:px-6">
        <div class="rounded-2xl border border-school-400 bg-white p-6 sm:p-8 shadow-sm">
          <!-- Passo 1: escolher valor / meios -->
          <DonationCard v-if="step === 'form'" @criar="criarDoacao" />

          <!-- Aguardando / sucesso / erro -->
          <PaymentStatus
            v-else
            :step="step === 'sucesso' ? 'sucesso' : step === 'erro' ? 'erro' : 'aguardando'"
            :amount-cents="pagamento?.amountCents ?? 0"
            :recurring="pagamento?.recurring ?? false"
            :erro-msg="erroMsg"
            @voltar="voltarParaForm"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-school-900 text-school-400">
      <div
        class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        <!-- Marca -->
        <div class="space-y-4">
          <RouterLink to="/" class="flex items-center gap-2">
            <img :src="logDark" alt="Logo LetMeDoIt" class="h-8 w-auto" />
          </RouterLink>
          <p class="text-sm text-school-500 leading-relaxed max-w-xs">
            Obrigado de coração por apoiar o LetMeDoIt. Sua doação mantém a
            correção de provas por IA no ar, de professor pra professor. 💚
          </p>
          <div class="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/letmedoit_ifpi"
              aria-label="Instagram"
              class="w-9 h-9 rounded-lg bg-school-800 hover:bg-indigo-600 flex items-center justify-center text-school-400 hover:text-white transition-all"
            >
              <i class="pi pi-instagram text-sm"></i>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              class="w-9 h-9 rounded-lg bg-school-800 hover:bg-indigo-600 flex items-center justify-center text-school-400 hover:text-white transition-all"
            >
              <i class="pi pi-youtube text-sm"></i>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              class="w-9 h-9 rounded-lg bg-school-800 hover:bg-indigo-600 flex items-center justify-center text-school-400 hover:text-white transition-all"
            >
              <i class="pi pi-linkedin text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-widest">Navegação</h3>
          <nav class="flex flex-col gap-3">
            <RouterLink
              to="/"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <i class="pi pi-arrow-left text-xs text-indigo-400"></i>
              Voltar para o site
            </RouterLink>
            <RouterLink
              to="/pricing"
              class="text-sm text-school-400 hover:text-white transition-colors"
            >
              Preços
            </RouterLink>
            <RouterLink
              to="/perguntas-frequentes"
              class="text-sm text-school-400 hover:text-white transition-colors"
            >
              Perguntas frequentes
            </RouterLink>
            <RouterLink
              to="/doar"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <i class="pi pi-heart text-xs text-indigo-400"></i>
              Apoiar o projeto
            </RouterLink>
          </nav>
        </div>

        <!-- Empresa -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-widest">Empresa</h3>
          <nav class="flex flex-col gap-3">
            <RouterLink to="/" class="text-sm text-school-400 hover:text-white transition-colors">
              Sobre Nós
            </RouterLink>
            <RouterLink to="/" class="text-sm text-school-400 hover:text-white transition-colors">
              Equipe
            </RouterLink>
            <RouterLink to="/" class="text-sm text-school-400 hover:text-white transition-colors">
              Blog
            </RouterLink>
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
          </nav>
        </div>

        <!-- Contato rápido -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-widest">Entre em contato</h3>
          <nav class="flex flex-col gap-3">
            <a
              href="mailto:contato@letmedoit.app.br"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <i class="pi pi-envelope text-xs text-indigo-400"></i>
              contato@letmedoit.app.br
            </a>
            <a
              href="tel:+5586900000000"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <i class="pi pi-phone text-xs text-indigo-400"></i>
              +55 (89) 99426-8109
            </a>
            <a
              href="#"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <i class="pi pi-map-marker text-xs text-indigo-400"></i>
              Picos · Piauí
            </a>
          </nav>
        </div>
      </div>

      <!-- Créditos -->
      <div class="border-t border-school-800 py-6">
        <div
          class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p class="text-xs text-school-600">&copy; 2026 LetMeDoIt. Todos os direitos reservados.</p>
          <p class="text-xs text-school-600">Pagamentos processados pelo ASAAS (ambiente de teste).</p>
        </div>
      </div>
    </footer>
  </div>
</template>
