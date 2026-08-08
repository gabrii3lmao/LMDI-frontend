<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import logLight from "@/assets/logo1.webp";
import logDark from "@/assets/logo-white.png";
import { donationService } from "@/services/donationService";
import type { BillingType } from "@/types/Donation";
import DonationCard from "@/components/donation/DonationCard.vue";
import PaymentStatus from "@/components/donation/PaymentStatus.vue";

type Step = "form" | "aguardando" | "sucesso" | "erro";

const route = useRoute();
const themeStore = useThemeStore();

const logoSrc = computed(() =>
  themeStore.theme === "dark" ? logDark : logLight,
);

const scrolled = ref(false);
function handleScroll() {
  scrolled.value = window.scrollY > 60;
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
  window.addEventListener("scroll", handleScroll, { passive: true });

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
  window.removeEventListener("scroll", handleScroll);
  pararPolling();
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-lousa-900 font-sans">
    <!-- Navbar -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="
        scrolled
          ? 'bg-white/95 dark:bg-lousa-900/95 backdrop-blur-xl shadow-lg shadow-school-900/5 dark:shadow-black/30 border-b border-school-200/50 dark:border-lousa-700/50'
          : 'bg-white/80 dark:bg-lousa-900/80 backdrop-blur-md border-b border-transparent'
      "
    >
      <div
        class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 transition-all duration-300"
        :class="scrolled ? 'h-14' : 'h-16'"
      >
        <div class="flex items-center justify-between gap-2 h-full">
          <RouterLink to="/" class="flex items-center gap-2 sm:gap-3 shrink-0">
            <img :src="logoSrc" alt="LetMeDoIt" class="h-8 sm:h-9 w-auto" />
            <p class="text-base sm:text-xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight whitespace-nowrap">
              Let me <span class="text-indigo-600 dark:text-indigo-400">Do it</span>
            </p>
          </RouterLink>
          <nav class="flex items-center gap-1.5 sm:gap-3">
            <RouterLink
              to="/signin"
              class="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-school-600 dark:text-lousa-400 hover:text-school-900 dark:hover:text-lousa-100 transition-colors whitespace-nowrap"
            >
              Entrar
            </RouterLink>
            <RouterLink
              to="/signup"
              class="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              Cadastre-se Grátis
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
      class="relative pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white dark:from-lousa-800 dark:to-lousa-900"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent pointer-events-none"
      ></div>
      <div class="max-w-3xl mx-auto px-6 relative z-10 text-center space-y-6">
        <div
          class="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-lousa-800 border-2 border-indigo-100 dark:border-lousa-600 shadow-lg shadow-indigo-600/10 flex items-center justify-center overflow-hidden p-2"
        >
          <img :src="logoSrc" alt="Logo LetMeDoIt" class="w-full h-full object-contain" />
        </div>

        <div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight leading-tight">
            Ajude a manter o
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">
              LetMeDoIt no ar
            </span>
          </h1>
          <p class="mt-4 text-base md:text-lg text-school-500 dark:text-lousa-400 max-w-xl mx-auto">
            Cada contribuição cobre hospedagem e o tempo que gasto mantendo e
            criando novas funcionalidades — e me dá energia pra continuar
            melhorando a correção por IA dos seus alunos.
          </p>
        </div>
      </div>
    </section>

    <!-- Card de doação -->
    <section class="pb-20 md:pb-28 -mt-4 relative z-10">
      <div class="max-w-xl mx-auto px-4 sm:px-6">
        <div class="reveal visible rounded-2xl border bg-white dark:bg-lousa-800 p-6 sm:p-8 shadow-xl shadow-school-900/5 border-school-200 dark:border-lousa-700">
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
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 py-12">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <img :src="logDark" alt="LetMeDoIt" class="h-8 w-auto" />
            <p class="text-sm text-school-500">
              Obrigado de coração por apoiar o projeto. 💚
            </p>
          </div>
          <nav class="flex items-center gap-5">
            <RouterLink to="/" class="text-sm text-school-400 hover:text-white transition-colors">
              <i class="pi pi-arrow-left text-xs mr-1"></i>
              Voltar para o site
            </RouterLink>
            <a
              href="mailto:contato@letmedoit.app.br"
              class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <i class="pi pi-envelope text-xs text-indigo-400"></i>
              Contato
            </a>
          </nav>
        </div>
      </div>
      <div class="border-t border-school-800 py-5">
        <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p class="text-xs text-school-600">
            &copy; 2026 LetMeDoIt. Todos os direitos reservados.
          </p>
          <p class="text-xs text-school-600">
            Pagamentos processados pelo ASAAS (ambiente de teste).
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
