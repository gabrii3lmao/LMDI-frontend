<script setup lang="ts">
import { ref } from "vue";

interface FaqItem {
  q: string;
  a: string;
  open: boolean;
}

const faqs = ref<FaqItem[]>([
  {
    q: "Como funciona o LetMeDoIt?",
    a: "Você cadastra suas turmas, monta um gabarito modelo e fotografa os cartões-resposta dos alunos. A inteligência artificial identifica as marcações e gera as notas automaticamente em segundos.",
    open: false,
  },
  {
    q: "A precisão da correção é garantida?",
    a: "Sim. A taxa de acerto do nosso modelo é superior a 99% em condições ideais de imagem. Recomendamos fotos bem iluminadas e com enquadramento adequado.",
    open: false,
  },
  {
    q: "Preciso instalar algum software?",
    a: "Não. Tudo funciona direto pelo navegador — computador, tablet ou celular. Basta acessar sua conta e começar.",
    open: false,
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças entram em vigor na próxima fatura.",
    open: false,
  },
  {
    q: "Meus dados estão protegidos?",
    a: "Sim. Utilizamos criptografia de ponta a ponta e seguimos todas as diretrizes da LGPD. Suas informações e as provas dos alunos são tratadas com total sigilo.",
    open: false,
  },
]);

function toggle(index: number) {
  faqs.value[index]!.open = !faqs.value[index]!.open;
}
</script>

<template>
  <section id="sobre" class="scroll-mt-20 py-20 md:py-28 bg-school-50">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Sobre + FAQ -->
        <div>
          <div class="mb-8 reveal">
            <p class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
              Um pouco mais sobre nós
            </p>
            <h2 class="font-display text-3xl md:text-4xl font-extrabold text-school-900 tracking-tight mb-4">
              Perguntas <span class="text-indigo-600">frequentes</span>
            </h2>
            <p class="text-lg text-school-500">
              Somos uma plataforma feita por e para educadores. Trabalhamos para devolver ao
              professor o que mais importa: tempo para ensinar.
            </p>
          </div>

          <div class="space-y-3 reveal">
            <div
              v-for="(item, i) in faqs"
              :key="item.q"
              class="bg-white border border-school-200 rounded-2xl overflow-hidden transition-all duration-300"
              :class="item.open ? 'border-indigo-200 shadow-lg shadow-indigo-500/5' : 'hover:border-indigo-200'"
            >
              <button
                @click="toggle(i)"
                class="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-school-50 transition-colors"
              >
                <span class="font-semibold text-school-800">{{ item.q }}</span>
                <i
                  class="pi pi-chevron-down text-indigo-500 transition-transform duration-300 shrink-0"
                  :class="{ 'rotate-180': item.open }"
                ></i>
              </button>
              <Transition name="accordion">
                <div v-if="item.open" class="px-5 pb-5">
                  <p class="text-sm text-school-500 leading-relaxed">{{ item.a }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Imagem -->
        <div class="relative reveal">
          <div
            class="absolute -inset-4 bg-gradient-to-br from-indigo-100 to-transparent rounded-3xl rotate-2"
          ></div>
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=70"
            alt="Professores e alunos em sala de aula"
            loading="lazy"
            class="relative w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-2xl shadow-school-200/60 border border-school-100"
          />
          <div
            class="absolute -bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-white rounded-2xl p-5 shadow-xl border border-school-100"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"
              >
                <i class="pi pi-clock text-xl"></i>
              </div>
              <div>
                <p class="text-2xl font-extrabold text-school-900">+10h</p>
                <p class="text-xs text-school-500">por semana devolvidas ao professor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
