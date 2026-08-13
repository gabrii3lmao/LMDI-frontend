<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import logLight from "@/assets/logo1.webp";
import logDark from "@/assets/logo-white.png";

const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

const logoSrc = computed(() =>
  themeStore.theme === "dark" ? logDark : logLight,
);

// ============================================================
// LINKS DE PAGAMENTO (ASAAS)
// 👉 Preencha abaixo os links de R$10 e R$20 (o de R$5 já está pronto).
// ============================================================
const asaasLinks = reactive<Record<number, string>>({
  5: "https://www.asaas.com/c/jjllh3gjzrtud52d",
  10: "", // TODO: colar link ASAAS de R$ 10,00
  20: "", // TODO: colar link ASAAS de R$ 20,00
});

const amounts = [5, 10, 20];

const selectedAmount = ref<number | null>(5);
const customInput = ref("");
const customMessage = ref("");
const recurring = ref(false);

const scrolled = ref(false);
const thanked = ref(false);
const THANK_KEY = "lmdoit_apoio_obrigado";

function handleScroll() {
  scrolled.value = window.scrollY > 60;
}

function customValidValue(): number | null {
  const num = parseInt(customInput.value.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(num) && num > 0 ? num : null;
}

const effectiveValue = computed(() => {
  if (selectedAmount.value !== null) return selectedAmount.value;
  return customValidValue() ?? 0;
});

function pick(value: number) {
  selectedAmount.value = value;
  customInput.value = "";
  customMessage.value = "";
}

function onCustomInput() {
  selectedAmount.value = null;
  const num = customValidValue();
  if (num === null) {
    customMessage.value = "";
    return;
  }
  customMessage.value = Object.prototype.hasOwnProperty.call(asaasLinks, num)
    ? ""
    : "Para este valor, entre em contato pelo e-mail abaixo — resolvemos rapidinho.";
}

function currentLink(): string | null {
  const key = effectiveValue.value;
  const url = asaasLinks[key];
  return typeof url === "string" && url.trim() !== "" ? url : null;
}

function support() {
  const num = effectiveValue.value;
  if (num <= 0) {
    customMessage.value =
      "Digite um valor para continuar — 5, 10 ou 20 reais. 😊";
    return;
  }
  const link = currentLink();
  if (link) {
    window.open(link, "_blank", "noopener");
    markThanked();
  } else {
    customMessage.value =
      "Este valor ainda não tem link pronto — chama a gente no e-mail para combinar.";
  }
}

function markThanked() {
  thanked.value = true;
  sessionStorage.setItem(THANK_KEY, "1");
}

function clearThanked() {
  thanked.value = false;
  sessionStorage.removeItem(THANK_KEY);
}

function goHome() {
  clearThanked();
  router.push("/");
}

let observer: IntersectionObserver | null = null;
function initReveal() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "-40px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
}

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.replace("/dashboard");
    return;
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  requestAnimationFrame(initReveal);

  if (route.query.obrigado === "1" || sessionStorage.getItem(THANK_KEY) === "1") {
    markThanked();
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
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
            <p class="text-base sm:text-xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight whitespace-nowrap">Let me <span class="text-indigo-600 dark:text-indigo-400">Do it</span></p>
          </RouterLink>
          <nav class="flex items-center gap-1.5 sm:gap-3">
            <RouterLink
              to="/"
              class="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-school-600 dark:text-lousa-400 hover:text-school-900 dark:hover:text-lousa-100 transition-colors whitespace-nowrap"
            >
              Início
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
      class="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white dark:from-lousa-800 dark:to-lousa-900"
    >
      <div class="hero-glow"></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent pointer-events-none"
      ></div>
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <div
            class="mx-auto w-20 h-20 rounded-full overflow-hidden ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/10 hero-fade-in"
          >
            <img :src="logoSrc" alt="Apoiado por" class="w-full h-full object-cover" />
          </div>
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold border border-borda-200 dark:border-borda-700 hero-fade-in"
          >
            <i class="pi pi-heart-fill text-xs"></i>
            Tip jar · café virtual
          </div>
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight leading-tight hero-fade-in"
            style="animation-delay: 0.1s"
          >
            Ajude a manter o
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">Let Me Do It</span>
            no ar
          </h1>
          <p
            class="text-lg md:text-xl text-school-500 dark:text-lousa-400 max-w-2xl mx-auto hero-fade-in"
            style="animation-delay: 0.2s"
          >
            Cada apoio cobre hospedagem, alimenta o tempo que dedico à manutenção
            e me ajuda a tirar novas features do papel. Se você já salva horas com
            a correção de provas, esse é um jeito simples de retribuir.
          </p>
        </div>
      </div>
    </section>

    <!-- Tip jar -->
    <section class="pb-20 md:pb-28 -mt-6 relative z-10">
      <div class="max-w-xl mx-auto px-6">
        <div
          class="reveal relative rounded-2xl border bg-white dark:bg-lousa-800 border-borda-200 dark:border-borda-700 shadow-lg shadow-indigo-500/10 overflow-hidden"
        >
          <!-- estado agradecimento -->
          <Transition name="fade">
            <div v-if="thanked" class="p-10 md:p-12 text-center space-y-5">
              <div
                class="w-16 h-16 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center"
              >
                <i class="pi pi-check text-3xl text-indigo-600 dark:text-indigo-400"></i>
              </div>
              <h2 class="text-3xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight">
                Muito obrigado! 🙏
              </h2>
              <p class="text-school-500 dark:text-lousa-400 leading-relaxed">
                Sua ajuda faz o Let Me Do It continuar de pé. Querendo ou não,
                você acabou de financiar correções de provas para um monte de
                professores por aí. A gente se vê por aqui!
              </p>
              <button
                @click="goHome"
                class="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                Voltar ao início
                <i class="pi pi-arrow-right text-sm"></i>
              </button>
            </div>
          </Transition>

          <!-- Formulário do apoio -->
          <div v-if="!thanked" class="p-8 md:p-10">
            <h2 class="text-xl md:text-2xl font-bold text-school-900 dark:text-lousa-100 mb-1">
              Escolha um valor
            </h2>
            <p class="text-sm text-school-500 dark:text-lousa-400 mb-6">
              Sem cadastro, sem assinatura chata. É rápido.
            </p>

            <!-- Valores sugeridos -->
            <div class="grid grid-cols-3 gap-3 mb-4">
              <button
                v-for="val in amounts"
                :key="val"
                @click="pick(val)"
                class="py-3 rounded-xl font-bold text-base transition-all active:scale-95 border"
                :class="
                  selectedAmount === val
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25'
                    : 'bg-school-50 dark:bg-lousa-700/50 text-school-700 dark:text-lousa-200 border-school-200 dark:border-lousa-600 hover:border-borda-300 dark:hover:border-borda-600'
                "
              >
                R$ {{ val }}
              </button>
            </div>

            <!-- Valor livre -->
            <label
              class="block mb-6 text-sm font-semibold text-school-700 dark:text-lousa-200"
            >
              Quer outro valor?
              <div class="mt-2 relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 font-bold"
                  >R$</span
                >
                <input
                  id="custom-amount"
                  v-model="customInput"
                  type="text"
                  inputmode="numeric"
                  placeholder="0,00"
                  @focus="selectedAmount = null"
                  @input="onCustomInput"
                  class="w-full pl-12 pr-4 py-3 rounded-xl border bg-school-50 dark:bg-lousa-700/60 text-school-800 dark:text-lousa-100 font-bold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </label>

            <p v-if="customMessage" class="text-sm text-school-500 dark:text-lousa-400 bg-school-50 dark:bg-lousa-700/40 border border-school-200 dark:border-lousa-600 rounded-xl px-4 py-3 mb-4 leading-relaxed">
              <i class="pi pi-info-circle mr-1 text-indigo-500"></i>
              {{ customMessage }}
            </p>

            <!-- Recorrente -->
            <button
              @click="recurring = !recurring"
              class="w-full flex items-center justify-between gap-3 p-4 rounded-xl border transition-all mb-6"
              :class="
                recurring
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-school-200 dark:border-lousa-700 bg-school-50 dark:bg-lousa-700/40'
              "
            >
              <span class="text-left">
                <span class="block font-semibold text-school-800 dark:text-lousa-200 text-sm">
                  Quero apoiar todo mês
                </span>
                <span class="block text-xs text-school-500 dark:text-lousa-400 mt-0.5">
                  Recorrente · sem compromisso, cancele quando quiser
                </span>
              </span>
              <span
                class="relative w-10 h-6 rounded-full transition-colors shrink-0"
                :class="recurring ? 'bg-indigo-600' : 'bg-school-300 dark:bg-lousa-600'"
              >
                <span
                  class="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                  :class="recurring ? 'left-[1.125rem]' : 'left-0.5'"
                ></span>
              </span>
            </button>
            <p v-if="recurring" class="text-xs text-school-500 dark:text-lousa-400 -mt-4 mb-6">
              No checkout do ASAAS você pode marcar a recorrência mensal. Simples assim.
            </p>

            <!-- CTA -->
            <button
              @click="support"
              class="w-full inline-flex items-center justify-center gap-2 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
            >
              <i class="pi pi-heart text-sm"></i>
              Apoiar agora
              <template v-if="effectiveValue">— R$ {{ effectiveValue }}</template>
              <i class="pi pi-arrow-right text-sm"></i>
            </button>
          </div>
        </div>

        <p class="text-center text-xs text-school-400 dark:text-lousa-500 mt-6 reveal">
          Pagamento seguro e processado pelo ASAAS — você não sai da janela de
          pagamento para nenhum outro lugar.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-school-900 text-school-400">
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 py-14 text-center space-y-4">
        <div class="flex items-center justify-center gap-2">
          <img :src="logDark" alt="LetMeDoIt" class="h-8 w-auto" />
        </div>
        <p class="text-sm text-school-400 max-w-md mx-auto leading-relaxed">
          Obrigado por ajudar a manter a correção de provas gratuita e acessível
          para quem mais precisa. 💚
        </p>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <i class="pi pi-arrow-left text-xs"></i>
          Voltar para o Let Me Do It
        </RouterLink>
      </div>
      <div class="border-t border-school-800 py-6">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <p class="text-xs text-school-600">
            &copy; 2026 LetMeDoIt · Tip jar
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hero-glow {
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(16, 185, 129, 0.04),
    transparent,
    rgba(16, 185, 129, 0.04),
    transparent
  );
  animation: rotateGlow 30s linear infinite;
  pointer-events: none;
}
@keyframes rotateGlow {
  to {
    transform: rotate(360deg);
  }
}

.hero-fade-in {
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes heroFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>