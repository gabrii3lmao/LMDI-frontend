<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast"; // <-- Importamos o useToast

const toast = useToast(); // <-- Inicializamos o toast

interface InitialData {
  _id?: string;
  title: string;
  questionsCount: number;
  choicesCount: number;
  answerKey?: string[];
}

const props = defineProps<{
  isOpen: boolean;
  enviando: boolean;
  initialData?: InitialData | null;
}>();

const emit = defineEmits(["close", "confirm"]);

const nomeProva = ref("");
const qtdQuestoes = ref(10);
const qtdAlternativas = ref(5);
const respostas = ref<string[]>([]);

const alternativas = computed(() =>
  Array.from({ length: qtdAlternativas.value }, (_, i) =>
    String.fromCharCode(65 + i),
  ),
);

// 2. Este watch reage quando o Modal abre ou fecha.
watch(
  () => props.isOpen,
  (modalAberto) => {
    if (modalAberto) {
      if (props.initialData) {
        // MODO EDIÇÃO: Preenche os dados recebidos do componente pai
        nomeProva.value = props.initialData.title;
        qtdAlternativas.value = props.initialData.choicesCount;
        qtdQuestoes.value = props.initialData.questionsCount;

        // Garante que se a API já tiver as respostas, a gente as copia pro ref
        if (
          props.initialData.answerKey &&
          props.initialData.answerKey.length > 0
        ) {
          respostas.value = [...props.initialData.answerKey];
        }
      } else {
        // MODO CRIAÇÃO: Reseta o formulário
        nomeProva.value = "";
        qtdAlternativas.value = 5;
        qtdQuestoes.value = 10;
        respostas.value = Array(10).fill("");
      }
    }
  },
);

// Mantemos esse watch para ajustar o array de respostas quando o usuário muda o input numérico
watch(
  qtdQuestoes,
  (novaQtd) => {
    const diff = novaQtd - respostas.value.length;
    if (diff > 0) respostas.value.push(...Array(diff).fill(""));
    else respostas.value.splice(novaQtd);
  },
  { immediate: true },
);

function handleSubmit() {
  if (respostas.value.some((r) => r === "")) {
    toast.add({
      severity: "warn",
      summary: "Atenção",
      detail: "Preencha o gabarito de todas as questões antes de salvar.",
      life: 4000,
    });
    return;
  }

  emit("confirm", {
    name: nomeProva.value,
    questionCount: qtdQuestoes.value,
    choicesCount: qtdAlternativas.value,
    answerKey: respostas.value,
  });
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-school-900/40 backdrop-blur-sm"
  >
    <div
      class="bg-white dark:bg-lousa-800 border border-school-200 dark:border-lousa-700 w-full max-w-4xl rounded-3xl shadow-2xl p-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-school-800 dark:text-lousa-100">
          {{ props.initialData ? "Editar Gabarito" : "Novo Gabarito Oficial" }}
        </h2>
        <button
          @click="emit('close')"
          class="text-school-400 dark:text-lousa-500 hover:text-school-600 dark:hover:text-lousa-300 p-2 transition-colors hover:bg-school-50 dark:hover:bg-lousa-700 rounded-lg"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="flex flex-col gap-1">
          <label
            class="text-xs font-bold text-school-500 dark:text-lousa-400 uppercase tracking-wider mb-1 px-1"
            >Nome</label
          >
          <input
            v-model="nomeProva"
            class="bg-school-50/50 dark:bg-lousa-700/50 border border-school-200 dark:border-lousa-600 rounded-xl p-2.5 text-sm text-school-800 dark:text-lousa-100 placeholder-school-400 dark:placeholder-lousa-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm"
            placeholder="Ex: Simulado A"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="text-xs font-bold text-school-500 dark:text-lousa-400 uppercase tracking-wider mb-1 px-1"
            >Questões</label
          >
          <input
            v-model.number="qtdQuestoes"
            type="number"
            min="1"
            class="bg-school-50/50 dark:bg-lousa-700/50 border border-school-200 dark:border-lousa-600 rounded-xl p-2.5 text-sm text-school-800 dark:text-lousa-100 placeholder-school-400 dark:placeholder-lousa-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="text-xs font-bold text-school-500 dark:text-lousa-400 uppercase tracking-wider mb-1 px-1"
            >Opções</label
          >
          <div
            class="flex bg-school-50 dark:bg-lousa-700 rounded-xl p-1 border border-school-200 dark:border-lousa-600 shadow-sm"
          >
            <button
              v-for="n in [4, 5]"
              :key="n"
              @click="qtdAlternativas = n"
              :class="[
                'flex-1 text-xs py-2 rounded-lg transition-all font-semibold',
                qtdAlternativas === n
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/10'
                  : 'text-school-500 dark:text-lousa-400 hover:text-school-800 dark:hover:text-lousa-200',
              ]"
            >
              {{ n }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="flex-1 overflow-y-auto custom-scrollbar pr-2 pt-4 border-t border-school-100 dark:border-lousa-700"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="i in qtdQuestoes"
            :key="i"
            class="flex items-center justify-between p-2.5 rounded-xl bg-school-50/50 dark:bg-lousa-700/50 border border-school-200/80 dark:border-lousa-600 shadow-sm"
          >
            <span class="text-xs font-mono font-semibold text-school-400 dark:text-lousa-500">{{
              String(i).padStart(2, "0")
            }}</span>
            <div class="flex gap-1">
              <button
                v-for="alt in alternativas"
                :key="alt"
                @click="respostas[i - 1] = alt"
                :class="[
                  'w-8 h-8 rounded-lg text-xs font-bold border transition-all flex items-center justify-center',
                  respostas[i - 1] === alt
                    ? 'bg-indigo-600 dark:bg-indigo-500 border-transparent text-white shadow-md shadow-indigo-600/10'
                    : 'bg-white dark:bg-lousa-700 border-school-200 dark:border-lousa-600 text-school-400 dark:text-lousa-500 hover:bg-school-50 dark:hover:bg-lousa-600 hover:text-school-600 dark:hover:text-lousa-300',
                ]"
              >
                {{ alt }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6 pt-6 border-t border-school-100 dark:border-lousa-700">
        <button
          @click="emit('close')"
          class="flex-1 py-3 text-sm font-semibold text-school-500 dark:text-lousa-400 hover:text-school-800 dark:hover:text-lousa-200 transition-colors bg-school-100 dark:bg-lousa-700 hover:bg-school-200 dark:hover:bg-lousa-600 rounded-xl"
        >
          Cancelar
        </button>
        <button
          @click="handleSubmit"
          :disabled="enviando || nomeProva.trim() === ''"
          class="flex-[2] py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all rounded-xl font-bold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10 active:scale-95"
        >
          <span v-if="enviando" class="flex items-center justify-center gap-2">
            <i class="pi pi-spin pi-spinner animate-spin"></i> Salvando...
          </span>
          <span v-else-if="props.initialData">Atualizar Gabarito</span>
          <span v-else>Confirmar Gabarito</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #34d399;
}
</style>
