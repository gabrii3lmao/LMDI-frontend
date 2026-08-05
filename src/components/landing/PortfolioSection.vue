<script setup lang="ts">
import { ref, computed } from "vue";

interface PortfolioItem {
  img: string;
  alt: string;
  title: string;
  category: string;
}

const filters = [
  { id: "todos", label: "Todos" },
  { id: "correcao", label: "Correção" },
  { id: "gestao", label: "Gestão" },
  { id: "relatorios", label: "Relatórios" },
];

const activeFilter = ref("todos");

const items: PortfolioItem[] = [
  {
    img: "/app-screenshot-dashboard.png",
    alt: "Dashboard de desempenho do LetMeDoIt",
    title: "Dashboard de desempenho",
    category: "relatorios",
  },
  {
    img: "/app-screenshot-provas.png",
    alt: "Correção de cartões-resposta no LetMeDoIt",
    title: "Correção de cartões-resposta",
    category: "correcao",
  },
  {
    img: "/app-screenshot-turma.png",
    alt: "Gestão de turma no LetMeDoIt",
    title: "Gestão de turmas e provas",
    category: "gestao",
  },
  {
    img: "/app-screenshot-alunos.png",
    alt: "Submissões de alunos no LetMeDoIt",
    title: "Submissões dos alunos",
    category: "gestao",
  },
  {
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=70",
    alt: "Sala de aula moderna com carteiras",
    title: "Escola conectada",
    category: "correcao",
  },
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=70",
    alt: "Livros e materiais de estudo",
    title: "Dados que orientam o ensino",
    category: "relatorios",
  },
];

const categoryLabel = (id: string) => filters.find((f) => f.id === id)?.label ?? id;

const filtered = computed(() =>
  activeFilter.value === "todos"
    ? items
    : items.filter((i) => i.category === activeFilter.value),
);
</script>

<template>
  <section id="portfolio" class="scroll-mt-20 py-20 md:py-28 bg-school-50">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-10 md:mb-12 reveal">
        <p class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Portfólio</p>
        <h2 class="font-display text-3xl md:text-4xl font-extrabold text-school-900 tracking-tight mb-4">
          Trabalhos em <span class="text-indigo-600">destaque</span>
        </h2>
        <p class="text-lg text-school-500">
          Da correção à gestão, veja como a plataforma transforma o dia a dia das escolas.
        </p>
      </div>

      <!-- Filtro por categoria -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12 reveal">
        <button
          v-for="f in filters"
          :key="f.id"
          @click="activeFilter = f.id"
          class="px-5 py-2 rounded-full text-sm font-semibold transition-all active:scale-95"
          :class="
            activeFilter === f.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white text-school-600 border border-school-200 hover:border-borda-300 hover:text-indigo-600'
          "
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Grade de trabalhos -->
      <TransitionGroup
        name="portfolio"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <div
          v-for="item in filtered"
          :key="item.title"
          class="group relative rounded-2xl overflow-hidden border border-school-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
        >
          <img
            :src="item.img"
            :alt="item.alt"
            loading="lazy"
            class="w-full h-60 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div
            class="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            <span
              class="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold mb-3"
            >
              {{ categoryLabel(item.category) }}
            </span>
            <h3 class="text-white font-bold text-lg flex items-center justify-between gap-2">
              {{ item.title }}
              <span
                class="w-9 h-9 shrink-0 rounded-full bg-white/15 backdrop-blur flex items-center justify-center"
              >
                <i class="pi pi-arrow-up-right text-xs text-white"></i>
              </span>
            </h3>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.portfolio-enter-active,
.portfolio-leave-active,
.portfolio-move {
  transition: all 0.4s ease;
}

.portfolio-enter-from,
.portfolio-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
