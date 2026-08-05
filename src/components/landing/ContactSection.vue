<script setup lang="ts">
import { reactive, ref } from "vue";

const contactInfo = [
  {
    icon: "pi-map-marker",
    label: "Endereço",
    value: "IFPI · Picos, Piauí · Brasil",
  },
  { icon: "pi-phone", label: "Telefone", value: "+55 (86) 90000-0000" },
  { icon: "pi-envelope", label: "E-mail", value: "contato@letmedoit.app.br" },
];

const form = reactive({ nome: "", email: "", mensagem: "" });
const errors = reactive<{ nome?: string; email?: string; mensagem?: string }>(
  {},
);
const status = ref<"idle" | "sending" | "sent">("idle");

function validate() {
  errors.nome = form.nome.trim().length >= 2 ? undefined : "Informe seu nome.";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? undefined
    : "Informe um e-mail válido.";
  errors.mensagem =
    form.mensagem.trim().length >= 10
      ? undefined
      : "Escreva uma mensagem com pelo menos 10 caracteres.";
  return !errors.nome && !errors.email && !errors.mensagem;
}

async function handleSubmit() {
  if (!validate()) return;
  status.value = "sending";
  await new Promise((r) => setTimeout(r, 900));
  status.value = "sent";
  form.nome = "";
  form.email = "";
  form.mensagem = "";
  setTimeout(() => (status.value = "idle"), 5000);
}
</script>

<template>
  <section id="contato" class="scroll-mt-20 py-20 md:py-28 bg-white">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-14 md:mb-16 reveal">
        <p
          class="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3"
        >
          Contato
        </p>
        <h2
          class="font-display text-3xl md:text-4xl font-extrabold text-school-900 tracking-tight mb-4"
        >
          Vamos <span class="text-indigo-600">conversar?</span>
        </h2>
        <p class="text-lg text-school-500">
          Tem dúvidas ou quer levar a plataforma para a sua escola? Fale com a
          gente.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <!-- Informações + mapa -->
        <div class="reveal space-y-6">
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="flex items-start gap-4 bg-school-50 rounded-2xl p-5 border border-school-100"
            >
              <div
                class="w-11 h-11 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600"
              >
                <i :class="['pi', info.icon, 'text-lg']"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-school-900">{{ info.label }}</p>
                <p class="text-sm text-school-500 mt-0.5">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Mapa placeholder -->
          <div
            class="relative rounded-2xl overflow-hidden border border-school-200 h-64 map-grid"
          >
            <div
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div
                class="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40 animate-bounce"
              >
                <i class="pi pi-map-marker text-xl"></i>
              </div>
              <p class="mt-3 text-sm font-bold text-school-700">
                Teresina · Piauí · Brasil
              </p>
              <p class="text-xs text-school-400">Mapa ilustrativo</p>
            </div>
          </div>
        </div>

        <!-- Formulário -->
        <form
          class="reveal bg-school-50 rounded-3xl p-6 md:p-8 border border-school-100"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div class="space-y-5">
            <div>
              <label
                for="contato-nome"
                class="block text-sm font-semibold text-school-700 mb-1.5"
              >
                Nome
              </label>
              <input
                id="contato-nome"
                v-model="form.nome"
                type="text"
                placeholder="Seu nome completo"
                class="w-full px-4 py-3 rounded-xl border bg-white text-sm text-school-900 placeholder:text-school-400 focus:outline-none focus:ring-2 transition-all"
                :class="
                  errors.nome
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-school-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                "
              />
              <p v-if="errors.nome" class="mt-1.5 text-xs text-red-500">
                {{ errors.nome }}
              </p>
            </div>

            <div>
              <label
                for="contato-email"
                class="block text-sm font-semibold text-school-700 mb-1.5"
              >
                E-mail
              </label>
              <input
                id="contato-email"
                v-model="form.email"
                type="email"
                placeholder="voce@escola.edu.br"
                class="w-full px-4 py-3 rounded-xl border bg-white text-sm text-school-900 placeholder:text-school-400 focus:outline-none focus:ring-2 transition-all"
                :class="
                  errors.email
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-school-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                "
              />
              <p v-if="errors.email" class="mt-1.5 text-xs text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label
                for="contato-mensagem"
                class="block text-sm font-semibold text-school-700 mb-1.5"
              >
                Mensagem
              </label>
              <textarea
                id="contato-mensagem"
                v-model="form.mensagem"
                rows="5"
                placeholder="Como podemos ajudar?"
                class="w-full px-4 py-3 rounded-xl border bg-white text-sm text-school-900 placeholder:text-school-400 focus:outline-none focus:ring-2 transition-all resize-none"
                :class="
                  errors.mensagem
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-school-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                "
              ></textarea>
              <p v-if="errors.mensagem" class="mt-1.5 text-xs text-red-500">
                {{ errors.mensagem }}
              </p>
            </div>

            <Transition name="fade">
              <div
                v-if="status === 'sent'"
                class="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3"
              >
                <i class="pi pi-check-circle text-indigo-600 text-lg"></i>
                <p class="text-sm font-semibold text-indigo-700">
                  Mensagem enviada! Em breve entraremos em contato.
                </p>
              </div>
            </Transition>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <i
                v-if="status === 'sending'"
                class="pi pi-spinner pi-spin text-sm"
              ></i>
              <span>{{
                status === "sending" ? "Enviando..." : "Enviar mensagem"
              }}</span>
              <i v-if="status !== 'sending'" class="pi pi-send text-sm"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.map-grid {
  background-color: #f8fafc;
  background-image:
    linear-gradient(rgba(5, 150, 105, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(5, 150, 105, 0.12) 1px, transparent 1px);
  background-size: 32px 32px;
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
