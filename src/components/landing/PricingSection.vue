<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const selectedPlan = ref<"monthly" | "annual">("monthly");

const planos = [
  {
    name: "Básico",
    subtitle: "Para começar agora",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "",
    features: [
      "Até 30 alunos por turma",
      "3 turmas ativas",
      "Correção por IA",
      "Exportação CSV",
      "Relatórios básicos",
    ],
    highlighted: false,
    cta: "Cadastre-se Grátis",
  },
  {
    name: "Profissional",
    subtitle: "Para professores dedicados",
    monthlyPrice: 29,
    annualPrice: 290,
    period: "/mês",
    features: [
      "Até 50 alunos por turma",
      "Turmas ilimitadas",
      "Correção por IA prioritária",
      "Exportação CSV e Excel",
      "Relatórios avançados com gráficos",
      "Modelos de prova personalizados",
    ],
    highlighted: true,
    cta: "Assine Agora",
  },
  {
    name: "Empresarial",
    subtitle: "Para instituições",
    monthlyPrice: 99,
    annualPrice: 990,
    period: "/mês",
    features: [
      "Alunos e turmas ilimitados",
      "Correção por IA em lote",
      "Exportação CSV, Excel e API",
      "Relatórios completos + dashboards",
      "Múltiplos professores",
      "Suporte 24h dedicado",
    ],
    highlighted: false,
    cta: "Falar com Vendas",
  },
];
</script>

<template>
  <section id="precos" class="scroll-mt-20 py-20 md:py-28 bg-white">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-10 reveal">
        <p class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Preços</p>
        <h2 class="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Planos para todos os <span class="text-emerald-600">tamanhos</span>
        </h2>
        <p class="text-lg text-slate-500">
          Do professor individual à instituição de ensino. Escolha o plano ideal para a sua
          realidade.
        </p>
      </div>

      <!-- Toggle mensal/anual -->
      <div class="flex items-center justify-center gap-4 mb-12 reveal">
        <button
          @click="selectedPlan = 'monthly'"
          class="text-sm font-semibold transition-colors"
          :class="selectedPlan === 'monthly' ? 'text-slate-900' : 'text-slate-400'"
        >
          Mensal
        </button>
        <button
          @click="selectedPlan = 'annual'"
          class="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all"
          :class="
            selectedPlan === 'annual'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-slate-100 text-slate-600'
          "
        >
          Anual
          <span class="text-[10px] font-bold bg-emerald-500 px-1.5 py-0.5 rounded-full text-white">
            -17%
          </span>
        </button>
      </div>

      <!-- Cards de planos -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
        <div
          v-for="(plano, i) in planos"
          :key="plano.name"
          class="reveal relative rounded-2xl border bg-white p-8 flex flex-col transition-all duration-300"
          :style="{ '--delay': i * 130 + 'ms' }"
          :class="
            plano.highlighted
              ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 lg:scale-[1.03] z-10 lg:-my-3 lg:py-10'
              : 'border-slate-200 hover:border-emerald-200 hover:shadow-lg'
          "
        >
          <!-- Badge destaque -->
          <div
            v-if="plano.highlighted"
            class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold shadow-lg whitespace-nowrap"
          >
            MAIS POPULAR
          </div>

          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-slate-900">{{ plano.name }}</h3>
            <p class="text-sm text-slate-500 mt-1">{{ plano.subtitle }}</p>
          </div>

          <div class="text-center mb-6">
            <span class="text-5xl font-extrabold text-slate-900">
              <template v-if="plano.monthlyPrice === 0">Grátis</template>
              <template v-else>
                R$ {{ selectedPlan === "monthly" ? plano.monthlyPrice : plano.annualPrice }}
              </template>
            </span>
            <span v-if="plano.monthlyPrice > 0" class="text-slate-400 text-lg font-medium">
              {{ plano.period }}
            </span>
          </div>

          <ul class="space-y-3 mb-8 flex-1">
            <li
              v-for="feature in plano.features"
              :key="feature"
              class="flex items-start gap-3 text-sm text-slate-600"
            >
              <i class="pi pi-check-circle text-emerald-500 mt-0.5 text-base shrink-0"></i>
              {{ feature }}
            </li>
          </ul>

          <RouterLink
            to="/signup"
            class="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            :class="
              plano.highlighted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            "
          >
            {{ plano.cta }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
