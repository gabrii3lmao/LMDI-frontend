<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import logLight from "@/assets/logo1.webp";
import logDark from "@/assets/logo-white.png";

const router = useRouter();
const themeStore = useThemeStore();
const logoSrc = computed(() =>
  themeStore.theme === "dark" ? logDark : logLight,
);

const scrolled = ref(false);
function handleScroll() {
  scrolled.value = window.scrollY > 60;
}

const faqCategorias = ref([
  {
    categoria: "Primeiros Passos",
    icon: "pi-rocket",
    itens: [
      {
        q: "Como funciona o LetMeDoIt?",
        a: "Você cadastra suas turmas, monta um gabarito modelo e fotografa os cartões-resposta dos alunos. A inteligência artificial identifica as marcações e gera as notas automaticamente em segundos.",
        open: false,
      },
      {
        q: "Preciso instalar algum software?",
        a: "Não. Tudo funciona direto pelo navegador — computador, tablet ou celular. Basta acessar sua conta e começar.",
        open: false,
      },
      {
        q: "Quanto tempo leva para começar a usar?",
        a: "Menos de 5 minutos. Crie sua conta, cadastre uma turma, defina um gabarito modelo e já pode submeter a primeira prova.",
        open: false,
      },
      {
        q: "O LetMeDoIt é gratuito?",
        a: "Sim, temos um plano gratuito permanente com recursos essenciais. Para quem precisa de mais alunos e funcionalidades avançadas, oferecemos planos pagos.",
        open: false,
      },
    ],
  },
  {
    categoria: "Correção e IA",
    icon: "pi-cog",
    itens: [
      {
        q: "Como a IA corrige as provas?",
        a: "A IA analisa a foto do cartão-resposta, identifica as alternativas marcadas por cada aluno e compara com o gabarito oficial. O resultado sai com alta precisão em segundos.",
        open: false,
      },
      {
        q: "A precisão da correção é garantida?",
        a: "Sim. A taxa de acerto do nosso modelo é superior a 99% em condições ideais de imagem. Recomendamos fotos bem iluminadas e com enquadramento adequado.",
        open: false,
      },
      {
        q: "E se a IA errar uma marcação?",
        a: "Você pode revisar e ajustar manualmente qualquer resultado. A transparência é total — você vê exatamente o que foi detectado em cada cartão.",
        open: false,
      },
      {
        q: "Aceita qualquer modelo de cartão-resposta?",
        a: "Sim. O sistema é treinado para reconhecer os formatos mais comuns de cartão-resposta. Você também pode cadastrar um gabarito personalizado como modelo.",
        open: false,
      },
    ],
  },
  {
    categoria: "Conta e Assinatura",
    icon: "pi-user",
    itens: [
      {
        q: "Posso mudar de plano depois?",
        a: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças entram em vigor na próxima fatura.",
        open: false,
      },
      {
        q: "Meus dados ficam salvos se eu cancelar?",
        a: "Sim. Se você cancelar a assinatura, seus dados permanecem salvos por 90 dias. Caso reative a conta, tudo estará como antes.",
        open: false,
      },
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Cartão de crédito, boleto bancário e PIX. Para instituições de ensino, também emitimos nota fiscal.",
        open: false,
      },
      {
        q: "Existe período de teste do plano pago?",
        a: "Sim. Oferecemos 7 dias grátis do plano Profissional sem necessidade de cartão de crédito.",
        open: false,
      },
    ],
  },
  {
    categoria: "Segurança e Privacidade",
    icon: "pi-shield",
    itens: [
      {
        q: "Meus dados estão protegidos?",
        a: "Sim. Utilizamos criptografia de ponta a ponta para armazenamento e transmissão de dados. Suas informações e as provas dos alunos são tratadas com total sigilo.",
        open: false,
      },
      {
        q: "Onde as imagens das provas são armazenadas?",
        a: "As imagens são armazenadas em servidores seguros na nuvem com replicação e backup automáticos. Nunca compartilhamos dados com terceiros.",
        open: false,
      },
      {
        q: "O sistema está de acordo com a LGPD?",
        a: "Sim. O LetMeDoIt segue todas as diretrizes da Lei Geral de Proteção de Dados (LGPD). Você pode solicitar a exclusão completa dos seus dados a qualquer momento.",
        open: false,
      },
    ],
  },
]);

function toggleFaq(catIndex: number, itemIndex: number) {
  const item = faqCategorias.value[catIndex]!.itens[itemIndex]!;
  item.open = !item.open;
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
            <img
              :src="logoSrc"
              alt="LetMeDoIt"
              class="h-8 sm:h-9 w-auto"
            />
            <p class="text-base sm:text-xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight whitespace-nowrap">Let me <span class="text-indigo-600 dark:text-indigo-400">Do it</span></p>
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
    <section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white dark:from-lousa-800 dark:to-lousa-900">
      <div class="hero-glow"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent pointer-events-none"></div>
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold border border-indigo-200 dark:border-indigo-700 hero-fade-in">
            <i class="pi pi-question-circle text-xs"></i>
            Tire suas dúvidas
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight leading-tight hero-fade-in" style="animation-delay: 0.1s">
            Perguntas
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">Frequentes</span>
          </h1>
          <p class="text-lg md:text-xl text-school-500 dark:text-lousa-400 max-w-2xl mx-auto hero-fade-in" style="animation-delay: 0.2s">
            Tudo o que você precisa saber sobre o LetMeDoIt.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ content -->
    <section class="pb-20 md:pb-28 -mt-6 relative z-10">
      <div class="max-w-4xl mx-auto px-6">
        <div
          v-for="(cat, catIndex) in faqCategorias"
          :key="cat.categoria"
          class="reveal mb-12 last:mb-0"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <i :class="['pi', cat.icon, 'text-lg']"></i>
            </div>
            <h2 class="text-xl font-bold text-school-900 dark:text-lousa-100">
              {{ cat.categoria }}
            </h2>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, itemIndex) in cat.itens"
              :key="item.q"
              class="bg-school-50 dark:bg-lousa-800/50 border border-school-200 dark:border-lousa-700 rounded-2xl overflow-hidden transition-all duration-300"
              :class="item.open ? 'border-indigo-200 dark:border-indigo-700 shadow-lg shadow-indigo-500/5' : ''"
            >
              <button
                @click="toggleFaq(catIndex, itemIndex)"
                class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-school-100 dark:hover:bg-lousa-700/50 transition-colors"
              >
                <span class="font-semibold text-school-800 dark:text-lousa-200">{{ item.q }}</span>
                <i
                  class="pi pi-chevron-down text-indigo-500 transition-transform duration-300 shrink-0"
                  :class="{ 'rotate-180': item.open }"
                ></i>
              </button>
              <Transition name="accordion">
                <div v-if="item.open" class="px-5 pb-5">
                  <p class="text-sm text-school-500 dark:text-lousa-400 leading-relaxed">{{ item.a }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-indigo-600 to-indigo-800 relative overflow-hidden">
      <div class="hero-glow opacity-20"></div>
      <div class="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
          Ainda tem dúvidas?
        </h2>
        <p class="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
          Nossa equipe está pronta para ajudar.
        </p>
        <a
          href="mailto:noreply@letmedoit.app.br"
          class="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl transition-all shadow-lg shadow-indigo-950/20 active:scale-95"
        >
          <i class="pi pi-envelope"></i>
          Falar com Suporte
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-school-900 text-school-400">
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img :src="logoSrc" alt="LetMeDoIt" class="h-8 w-auto" />
          </div>
          <p class="text-sm text-school-500 leading-relaxed max-w-xs">
            Plataforma inteligente para correção automática de provas e gestão de submissões escolares.
          </p>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Produto</h4>
          <nav class="flex flex-col gap-3">
            <RouterLink to="/signup" class="text-sm text-school-400 hover:text-white transition-colors">Cadastre-se</RouterLink>
            <RouterLink to="/signin" class="text-sm text-school-400 hover:text-white transition-colors">Entrar</RouterLink>
            <RouterLink to="/pricing" class="text-sm text-school-400 hover:text-white transition-colors">Preços</RouterLink>
            <RouterLink to="/perguntas-frequentes" class="text-sm text-school-400 hover:text-white transition-colors">FAQ</RouterLink>
          </nav>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Empresa</h4>
          <nav class="flex flex-col gap-3">
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">Sobre Nós</a>
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">Blog</a>
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">Carreiras</a>
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">Termos de Uso</a>
          </nav>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Entre em contato</h4>
          <nav class="flex flex-col gap-3">
            <a href="mailto:noreply@letmedoit.app.br" class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2">
              <i class="pi pi-envelope text-xs text-indigo-400"></i>
              noreply@letmedoit.app.br
            </a>
            <a href="#" class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2">
              <i class="pi pi-comments text-xs text-indigo-400"></i>
              Chat ao Vivo
            </a>
          </nav>
        </div>
      </div>
      <div class="border-t border-school-800 py-6">
        <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-school-600">&copy; 2026 LetMeDoIt. Todos os direitos reservados.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">Privacidade</a>
            <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">Termos</a>
            <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hero-glow {
  position: absolute;
  inset: -50%;
  background: conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.04), transparent, rgba(16, 185, 129, 0.04), transparent);
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

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.35s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 300px;
}
</style>
