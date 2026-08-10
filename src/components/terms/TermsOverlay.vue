<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const visible = ref(false);
const loading = ref(false);

function shouldShow() {
  const token = localStorage.getItem("token");
  const acceptedAt = localStorage.getItem("acceptedTermsAt");
  if (!token || acceptedAt) return false;
  if (route.name === "termos" || route.name === "signin" || route.name === "register") {
    return false;
  }
  return true;
}

function evaluate() {
  visible.value = shouldShow();
}

onMounted(() => {
  evaluate();
  router.afterEach(() => {
    evaluate();
  });
});

async function handleAgree() {
  loading.value = true;
  try {
    const res = await api.post("/auth/accept-terms");
    localStorage.setItem("acceptedTermsAt", res.data.acceptedTermsAt || "");
    visible.value = false;
    toast.add({
      severity: "success",
      summary: "Termos aceitos",
      detail: "Obrigado por aceitar os Termos de Uso.",
      life: 4000,
    });
  } catch {
    toast.add({
      severity: "error",
      summary: "Não foi possível registrar o aceite",
      detail: "Tente novamente em instantes.",
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
}

async function handleDisagree() {
  loading.value = true;
  try {
    await api.post("/auth/signout");
  } catch {
    /* ignora falhas no logout */
  }
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  localStorage.removeItem("userPhoto");
  localStorage.removeItem("acceptedTermsAt");
  localStorage.removeItem("supportPromptDismissed");
  visible.value = false;
  router.push("/signin");
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    :closable="false"
    :closeOnEscape="false"
    :dismissableMask="false"
    :style="{ width: 'min(92vw, 520px)' }"
    class="terms-overlay"
  >
    <div class="text-center space-y-4 py-2">
      <div
        class="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center"
      >
        <i class="pi pi-file-contract text-2xl text-indigo-600 dark:text-indigo-400"></i>
      </div>
      <div>
        <h2 class="text-xl font-extrabold text-school-800 dark:text-lousa-100 tracking-tight">
          Aceite os Termos de Uso
        </h2>
        <p class="text-sm text-school-500 dark:text-lousa-400 leading-relaxed mt-2">
          Para continuar usando o LetMeDoIt, é necessário que você leia e
          aceite os
          <RouterLink
            to="/termos"
            class="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Termos de Uso
          </RouterLink>.
          Você pode revê-los a qualquer momento.
        </p>
      </div>

      <div
        class="rounded-xl bg-school-50 dark:bg-lousa-800/60 border border-school-200 dark:border-lousa-700 p-4 text-left space-y-2"
      >
        <p class="text-xs font-semibold text-school-500 dark:text-lousa-400 uppercase tracking-wider">
          Resumo dos termos
        </p>
        <ul class="space-y-2 text-xs text-school-600 dark:text-lousa-300 leading-relaxed">
          <li class="flex items-start gap-2">
            <i class="pi pi-check-circle text-indigo-500 mt-0.5"></i>
            <span>Uso da plataforma apenas para fins educacionais e legítimos.</span>
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-check-circle text-indigo-500 mt-0.5"></i>
            <span>Você é responsável por validar os resultados das correções por IA.</span>
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-check-circle text-indigo-500 mt-0.5"></i>
            <span>Seus dados e os dos seus alunos são tratados conforme a LGPD.</span>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-2.5">
        <button
          @click="handleAgree"
          :disabled="loading"
          class="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.98]"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <i class="pi pi-spin pi-spinner text-sm"></i> Registrando...
          </span>
          <span v-else><i class="pi pi-check-circle mr-2"></i>Concordo com os Termos</span>
        </button>
        <button
          @click="handleDisagree"
          :disabled="loading"
          class="w-full py-3 rounded-xl font-semibold text-school-600 dark:text-lousa-300 bg-school-50 dark:bg-lousa-800 hover:bg-school-100 dark:hover:bg-lousa-700 border border-school-200 dark:border-lousa-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          <i class="pi pi-times-circle mr-2"></i>Não concordo
        </button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
:deep(.p-dialog-header) {
  display: none;
}

:deep(.p-dialog-content) {
  padding: 1.75rem;
  border-radius: 1.25rem;
}
</style>
