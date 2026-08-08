<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import logLight from "@/assets/logo1.webp";

const scrolled = ref(false);
const menuOpen = ref(false);
const activeId = ref("inicio");

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "portfolio", label: "Portfólio" },
  { id: "precos", label: "Preços" },
  { id: "sobre", label: "Sobre" },
  { id: "equipe", label: "Equipe" },
  { id: "contato", label: "Contato" },
];

function handleScroll() {
  scrolled.value = window.scrollY > 40;
}

function scrollTo(id: string) {
  menuOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

let spyObserver: IntersectionObserver | null = null;

function initScrollSpy() {
  const sections = navItems
    .map((item) => document.getElementById(item.id))
    .filter((el): el is HTMLElement => el !== null);

  spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeId.value = entry.target.id;
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((section) => spyObserver?.observe(section));
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  initScrollSpy();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  spyObserver?.disconnect();
});
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      scrolled || menuOpen
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-school-900/5 border-b border-school-200'
        : 'bg-white/80 backdrop-blur-md border-b border-transparent'
    "
  >
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between gap-4 h-16 lg:h-[4.5rem]">
        <!-- Logo -->
        <a
          href="#inicio"
          class="flex items-center gap-2 sm:gap-3 shrink-0"
          @click.prevent="scrollTo('inicio')"
        >
          <img :src="logLight" alt="Logo LetMeDoIt" class="h-8 sm:h-9 w-auto" />
          <span class="text-lg sm:text-xl font-extrabold text-school-900 tracking-tight whitespace-nowrap">
            Let me <span class="text-indigo-600">Do it</span>
          </span>
        </a>

        <!-- Navegação desktop -->
        <nav class="hidden lg:flex items-center gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            href="#"
            class="px-3 py-2 text-sm font-semibold rounded-lg transition-colors"
            :class="
              activeId === item.id
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-school-600 hover:text-school-900 hover:bg-school-50'
            "
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
          <RouterLink
            to="/doar"
            class="ml-1 px-3 py-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <i class="pi pi-heart text-xs"></i>
            Apoiar
          </RouterLink>
        </nav>

        <!-- Ações -->
        <div class="flex items-center gap-2 sm:gap-3">
          <RouterLink
            to="/signin"
            class="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-school-600 hover:text-school-900 transition-colors"
          >
            Entrar
          </RouterLink>
          <RouterLink
            to="/signup"
            class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm shadow-indigo-600/20 active:scale-95"
          >
            Começar agora
            <i class="pi pi-arrow-right text-xs"></i>
          </RouterLink>

          <!-- Botão hambúrguer (mobile) -->
          <button
            class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-school-700 hover:bg-school-100 transition-colors"
            aria-label="Abrir menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <i :class="menuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="lg:hidden bg-white border-t border-school-200 shadow-xl">
        <nav class="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            href="#"
            class="px-4 py-3 rounded-xl text-base font-semibold transition-colors"
            :class="
              activeId === item.id
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-school-700 hover:bg-school-50'
            "
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
          <RouterLink
            to="/doar"
            class="px-4 py-3 rounded-xl text-base font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-2"
          >
            <i class="pi pi-heart text-sm"></i>
            Apoiar o projeto
          </RouterLink>
          <div class="grid grid-cols-2 gap-3 pt-3 mt-2 border-t border-school-100">
            <RouterLink
              to="/signin"
              class="px-4 py-3 rounded-xl text-center text-sm font-bold text-school-700 bg-school-100 hover:bg-school-200 transition-colors"
            >
              Entrar
            </RouterLink>
            <RouterLink
              to="/signup"
              class="px-4 py-3 rounded-xl text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Começar agora
            </RouterLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
