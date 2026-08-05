<script setup lang="ts">
import api from "@/services/api";
import { ref } from "vue";

const email = ref("");
const loading = ref(false);
const message = ref("");
const errorMsg = ref("");

async function handleForgotPassword() {
  message.value = "";
  errorMsg.value = "";

  try {
    loading.value = true;
    await api.post("/auth/forgot-password", {
      email: email.value,
    });

    message.value =
      "Se o e-mail estiver cadastrado, você receberá um link em breve! Verifique também sua caixa de spam.";
    email.value = "";
  } catch (error: any) {
    errorMsg.value =
      error.response?.data?.error || "Erro ao processar solicitação.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center p-4 overflow-hidden font-sans bg-gradient-to-br from-indigo-50 via-white to-school-100 dark:from-indigo-950 dark:via-lousa-900 dark:to-lousa-950"
  >
    <div
      class="absolute top-0 right-0 w-[32rem] h-[32rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[24rem] h-[24rem] -translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-300/10 dark:bg-indigo-600/5 blur-3xl pointer-events-none"
    ></div>

    <div
      class="relative z-20 w-full max-w-md bg-white/95 dark:bg-lousa-800/95 backdrop-blur-xl border border-school-200/80 dark:border-lousa-700 rounded-3xl p-8 sm:p-10 shadow-2xl"
    >
      <div class="flex flex-col items-center justify-center mb-8">
        <div
          class="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-800 rounded-2xl flex items-center justify-center mb-4"
        >
          <i class="pi pi-key text-3xl text-indigo-600 dark:text-indigo-400"></i>
        </div>

        <h2
          class="text-2xl font-extrabold tracking-tight text-school-800 dark:text-lousa-100 text-center"
        >
          Esqueceu a senha?
        </h2>
        <p class="text-sm text-school-500 dark:text-lousa-400 mt-2 text-center leading-relaxed font-medium">
          Informe seu e-mail de acesso e enviaremos as instruções de recuperação de senha.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="handleForgotPassword">
        <div
          v-if="message"
          class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200 text-sm flex flex-col gap-4 items-center text-center"
        >
          <div
            class="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400"
          >
            <i class="pi pi-send text-xl"></i>
          </div>
          <p class="font-semibold leading-relaxed">{{ message }}</p>
          <RouterLink
            to="/signin"
            class="w-full py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/10 text-center"
          >
            Voltar para o Login
          </RouterLink>
        </div>

        <div
          v-if="errorMsg"
          class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex gap-3 items-center"
        >
          <i class="pi pi-exclamation-circle text-red-500"></i>
          <p class="font-medium">{{ errorMsg }}</p>
        </div>

        <template v-if="!message">
          <div class="space-y-1.5">
            <label
              for="email"
              class="block text-xs font-bold text-school-500 dark:text-lousa-400 uppercase tracking-wider mb-2 px-1"
            >
              E-mail de Acesso
            </label>
            <div class="relative">
              <i
                class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-school-400 dark:text-lousa-500 text-sm"
              ></i>
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="professor@escola.com"
                required
                class="w-full pl-11 pr-4 py-3 bg-school-50/50 dark:bg-lousa-700/50 border border-school-200 dark:border-lousa-600 rounded-xl text-school-800 dark:text-lousa-100 placeholder-school-400 dark:placeholder-lousa-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center gap-2 py-3.5 mt-4 rounded-xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/10"
          >
            <i v-if="loading" class="pi pi-spin pi-spinner"></i>
            {{ loading ? "Enviando link..." : "Recuperar Acesso" }}
          </button>
        </template>
      </form>

      <div
        v-if="!message"
        class="mt-8 text-center border-t border-school-100 dark:border-lousa-700 pt-6"
      >
        <RouterLink
          to="/signin"
          class="text-sm font-semibold text-school-500 dark:text-lousa-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center justify-center gap-2"
        >
          <i class="pi pi-arrow-left text-[10px]"></i> Voltar ao Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake-x {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.animate-in.shake-x {
  animation: shake-x 0.2s ease-in-out 0s 2;
}
</style>
