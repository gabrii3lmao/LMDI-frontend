<script setup lang="ts">
interface Service {
  icon: string;
  bgIcon: string;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: "pi-building",
    bgIcon: "pi-building",
    title: "Gestão de Turmas",
    desc: "Organize suas salas em segundos. Cada turma mantém o histórico completo de provas, gabaritos e desempenho dos alunos.",
  },
  {
    icon: "pi-camera",
    bgIcon: "pi-camera",
    title: "Correção por IA",
    desc: "Fotografe os cartões-resposta e receba as notas automaticamente, com precisão superior a 99% e em qualquer formato de prova.",
  },
  {
    icon: "pi-chart-line",
    bgIcon: "pi-chart-line",
    title: "Relatórios e Métricas",
    desc: "Relatórios de desempenho individuais e coletivos gerados na hora, com exportação para CSV e Excel.",
  },
  {
    icon: "pi-file-check",
    bgIcon: "pi-file-check",
    title: "Modelos de Provas",
    desc: "Cadastre gabaritos personalizados como modelo e reutilize em qualquer turma. Zero configuração extra.",
  },
];
</script>

<template>
  <section id="servicos" class="scroll-mt-20 py-20 md:py-28 bg-white">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-14 md:mb-16 reveal">
        <p class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
          Nossos Serviços
        </p>
        <h2 class="font-display text-3xl md:text-4xl font-extrabold text-school-900 tracking-tight mb-4">
          Tudo o que a sua <span class="text-indigo-600">escola</span> precisa
        </h2>
        <p class="text-lg text-school-500">
          Uma plataforma completa para professores e instituições que querem economizar horas e ter
          controle total sobre o desempenho dos alunos.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(s, i) in services"
          :key="s.title"
          class="reveal group relative bg-white rounded-2xl p-8 border border-school-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden"
          :style="{ '--delay': i * 120 + 'ms' }"
        >
          <div
            class="absolute -top-8 -right-8 text-7xl text-indigo-500/5 group-hover:text-indigo-500/10 transition-all duration-700 rotate-12 group-hover:rotate-0"
          >
            <i :class="['pi', s.bgIcon]"></i>
          </div>
          <div
            class="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300"
          >
            <i :class="['pi text-xl', s.icon]"></i>
          </div>
          <h3 class="text-lg font-bold text-school-800 mb-3">{{ s.title }}</h3>
          <p class="text-sm text-school-500 leading-relaxed">{{ s.desc }}</p>
          <div
            class="mt-5 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
          >
            <span>Saiba mais</span>
            <i class="pi pi-arrow-right text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
