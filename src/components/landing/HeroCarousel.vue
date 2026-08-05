<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

interface HeroSlide {
  badge: string;
  badgeIcon: string;
  titleRest: string;
  titleHighlight: string;
  subtitle: string;
  img: string;
  imgAlt: string;
}

const slides: HeroSlide[] = [
  {
    badge: "Correção de provas por inteligência artificial",
    badgeIcon: "pi-sparkles",
    titleRest: "Corrigir provas é",
    titleHighlight: "trabalho da IA.",
    subtitle:
      "Crie gabaritos, fotografe os cartões-resposta e veja as notas surgirem automaticamente. Enquanto a IA trabalha, você volta a fazer o que importa: ensinar.",
    img: "/app-screenshot-dashboard.png",
    imgAlt: "Tela do dashboard do LetMeDoIt com métricas de desempenho",
  },
  {
    badge: "Feito para escolas e professores",
    badgeIcon: "pi-building",
    titleRest: "Mais tempo para ensinar,",
    titleHighlight: "menos pilhas de papel.",
    subtitle:
      "Uma plataforma completa para escolas, faculdades e institutos federais que querem ganhar horas e ter controle total do desempenho dos alunos.",
    img: "/app-screenshot-provas.png",
    imgAlt: "Tela de correção de provas do LetMeDoIt",
  },
  {
    badge: "Simples, rápido e no seu bolso",
    badgeIcon: "pi-mobile",
    titleRest: "Notas prontas em segundos,",
    titleHighlight: "direto do celular.",
    subtitle:
      "Fotografe as folhas de resposta com qualquer celular. A inteligência artificial identifica as marcações e gera as notas na hora.",
    img: "/app-screenshot-turma.png",
    imgAlt: "Tela de gestão de turma do LetMeDoIt",
  },
];

const current = ref(0);
let timer: ReturnType<typeof setInterval>;

function next() {
  current.value = (current.value + 1) % slides.length;
}

function prev() {
  current.value = (current.value - 1 + slides.length) % slides.length;
}

function goTo(i: number) {
  current.value = i;
  restart();
}

function restart() {
  clearInterval(timer);
  timer = setInterval(next, 6000);
}

function scrollToServicos() {
  document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  timer = setInterval(next, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <section
    id="inicio"
    class="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white"
  >
    <div class="hero-glow"></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/30 via-transparent to-transparent pointer-events-none"
    ></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-school-100 via-transparent to-transparent pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <!-- Texto -->
        <div class="text-center lg:text-left">
          <Transition name="slide" mode="out-in">
            <div :key="current" class="space-y-6">
              <span
                class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold border border-indigo-200"
              >
                <i :class="['pi', slides[current]!.badgeIcon, 'text-xs']"></i>
                {{ slides[current]!.badge }}
              </span>
              <h1
                class="text-4xl md:text-5xl xl:text-6xl font-display font-extrabold text-school-900 tracking-tight leading-[1.1]"
              >
                <span class="block">{{ slides[current]!.titleRest }}</span>
                <span
                  class="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700"
                >
                  {{ slides[current]!.titleHighlight }}
                </span>
              </h1>
              <p class="text-lg md:text-xl text-school-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {{ slides[current]!.subtitle }}
              </p>
            </div>
          </Transition>

          <!-- Botões -->
          <div
            class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <RouterLink
              to="/signup"
              class="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-95"
            >
              Começar agora
              <i class="pi pi-arrow-right text-sm"></i>
            </RouterLink>
            <button
              @click="scrollToServicos"
              class="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-school-700 bg-white hover:bg-school-50 rounded-xl transition-all border border-school-200 hover:border-school-300 shadow-sm active:scale-95"
            >
              Saiba mais
              <i class="pi pi-chevron-down text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Imagem -->
        <div class="relative">
          <div
            class="relative rounded-2xl border border-school-200 bg-white shadow-2xl shadow-school-200/60 overflow-hidden"
          >
            <div class="h-9 bg-school-50 border-b border-school-200 flex items-center gap-1.5 px-4">
              <span class="w-3 h-3 rounded-full bg-red-400"></span>
              <span class="w-3 h-3 rounded-full bg-indigo-400"></span>
              <span class="w-3 h-3 rounded-full bg-indigo-400"></span>
            </div>
            <div class="relative overflow-hidden">
              <Transition name="fade" mode="out-in">
                <img
                  :key="current"
                  :src="slides[current]!.img"
                  :alt="slides[current]!.imgAlt"
                  class="w-full h-auto"
                  loading="eager"
                />
              </Transition>
            </div>
          </div>

          <!-- Chips flutuantes -->
          <div
            class="hidden md:flex absolute -left-5 top-10 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl border border-school-100"
          >
            <div
              class="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600"
            >
              <i class="pi pi-clock text-base"></i>
            </div>
            <div>
              <p class="text-sm font-extrabold text-school-900">+10h/semana</p>
              <p class="text-xs text-school-500">recuperadas</p>
            </div>
          </div>
          <div
            class="hidden md:flex absolute -right-4 bottom-10 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl border border-school-100"
          >
            <div
              class="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600"
            >
              <i class="pi pi-shield text-base"></i>
            </div>
            <div>
              <p class="text-sm font-extrabold text-school-900">99% de precisão</p>
              <p class="text-xs text-school-500">na correção por IA</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles do carrossel -->
      <div class="mt-10 flex items-center justify-center gap-6">
        <button
          @click="prev"
          aria-label="Slide anterior"
          class="w-11 h-11 flex items-center justify-center rounded-full border border-school-200 bg-white text-school-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm active:scale-90"
        >
          <i class="pi pi-arrow-left text-sm"></i>
        </button>
        <div class="flex items-center gap-2">
          <button
            v-for="(_, i) in slides"
            :key="i"
            @click="goTo(i)"
            :aria-label="`Ir para o slide ${i + 1}`"
            class="rounded-full transition-all duration-500"
            :class="i === current ? 'w-8 h-2.5 bg-indigo-500' : 'w-2.5 h-2.5 bg-school-300 hover:bg-school-400'"
          ></button>
        </div>
        <button
          @click="next"
          aria-label="Próximo slide"
          class="w-11 h-11 flex items-center justify-center rounded-full border border-school-200 bg-white text-school-600 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-sm active:scale-90"
        >
          <i class="pi pi-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-glow {
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(16, 185, 129, 0.05),
    transparent,
    rgba(16, 185, 129, 0.05),
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
