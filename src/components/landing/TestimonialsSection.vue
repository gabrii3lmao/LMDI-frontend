<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Depoimento {
  quote: string;
  author: string;
  role: string;
  photo: string;
}

const depoimentos: Depoimento[] = [
  {
    quote:
      "Antes de conhecer o LetMeDoIt, eu passava horas corrigindo provas manualmente. Agora é só fotografar e pronto. Minhas noites livres voltaram.",
    author: "Dra. Carla Mendes",
    role: "Professora de Matemática · Ensino Médio",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=70",
  },
  {
    quote:
      "Com 200 alunos por turma, o sistema de IA reduziu meu tempo de correção em 90% e ainda gera relatórios de desempenho automáticos.",
    author: "Prof. Ricardo Oliveira",
    role: "Coordenador Pedagógico · Colégio Sigma",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=70",
  },
  {
    quote:
      "No começo desconfiei da precisão, mas depois de conferir os resultados, vi que acertava até mais que eu. Hoje não abro mão.",
    author: "Juliana Farias",
    role: "Professora de Português · Rede Estadual SP",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=70",
  },
  {
    quote:
      "O relatório que o sistema gera automaticamente me poupou dias de trabalho fechando notas no fim do bimestre. É impressionante.",
    author: "Felipe Nogueira",
    role: "Professor de Ciências · Escola Municipal RJ",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=70",
  },
  {
    quote:
      "Uso com minhas turmas de cursinho pré-vestibular. Corrijo 300 provas por semana em minutos. Nunca mais volto ao jeito antigo.",
    author: "Ana Beatriz Lins",
    role: "Professora de Redação · Curso Elite",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=70",
  },
];

const current = ref(0);
let timer: ReturnType<typeof setInterval>;

function next() {
  current.value = (current.value + 1) % depoimentos.length;
}

function prev() {
  current.value = (current.value - 1 + depoimentos.length) % depoimentos.length;
}

function goTo(i: number) {
  current.value = i;
  restart();
}

function restart() {
  clearInterval(timer);
  timer = setInterval(next, 5000);
}

onMounted(() => {
  timer = setInterval(next, 5000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
      <div class="reveal mb-12">
        <p class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Depoimentos</p>
        <h2 class="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Quem usa, <span class="text-emerald-600">recomenda</span>
        </h2>
        <p class="text-lg text-slate-500 max-w-xl mx-auto">
          Veja o que professores estão falando sobre o LetMeDoIt.
        </p>
      </div>

      <div class="relative mt-8 reveal">
        <!-- Barra de progresso do autoplay -->
        <div class="h-1 bg-slate-200 rounded-full overflow-hidden mb-8">
          <div
            class="h-full bg-emerald-500 rounded-full"
            :style="{ animation: 'progressBar 5s linear infinite' }"
          ></div>
        </div>

        <div class="relative bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
          <div
            class="absolute -top-5 left-8 w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25"
          >
            <i class="pi pi-quote-left text-lg"></i>
          </div>

          <div class="flex items-center justify-center gap-1 mb-6">
            <i v-for="_ in 5" :key="_" class="pi pi-star-fill text-amber-400 text-xl"></i>
          </div>

          <Transition name="testimonial" mode="out-in">
            <div :key="current">
              <p
                class="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed italic mb-8"
              >
                "{{ depoimentos[current]!.quote }}"
              </p>
              <div class="flex items-center justify-center gap-4">
                <img
                  :src="depoimentos[current]!.photo"
                  :alt="`Foto de ${depoimentos[current]!.author}`"
                  class="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                  loading="lazy"
                />
                <div class="text-left">
                  <p class="text-lg font-bold text-slate-900">{{ depoimentos[current]!.author }}</p>
                  <p class="text-sm text-slate-500">{{ depoimentos[current]!.role }}</p>
                </div>
              </div>
            </div>
          </Transition>

          <div class="flex items-center justify-center gap-2 mt-8">
            <button
              v-for="(_, i) in depoimentos"
              :key="i"
              @click="goTo(i)"
              aria-label="Ir para depoimento"
              class="rounded-full transition-all duration-500"
              :class="
                i === current
                  ? 'w-8 h-2.5 bg-emerald-500'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              "
            ></button>
          </div>
        </div>

        <!-- Setas -->
        <button
          @click="prev"
          aria-label="Depoimento anterior"
          class="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-all shadow-sm active:scale-90"
        >
          <i class="pi pi-arrow-left text-sm"></i>
        </button>
        <button
          @click="next"
          aria-label="Próximo depoimento"
          class="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-all shadow-sm active:scale-90"
        >
          <i class="pi pi-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-enter-active,
.testimonial-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.testimonial-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.testimonial-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

@keyframes progressBar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
