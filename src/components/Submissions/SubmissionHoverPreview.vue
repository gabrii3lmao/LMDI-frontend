<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import type { Submission } from "@/types/Submission";

const props = defineProps<{
  submission: Submission;
  anchor: HTMLElement;
}>();

const popEl = ref<HTMLElement | null>(null);
const popHeight = ref(260);
const tick = ref(0);

const totalQuestions = computed(() => props.submission.details?.length ?? 0);

const percentCorrect = computed(() => {
  if (totalQuestions.value === 0 || props.submission.totalCorrect === undefined) return null;
  return Math.round((props.submission.totalCorrect / totalQuestions.value) * 100);
});

const formattedDate = computed(() => {
  const d = new Date(props.submission.createdAt);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
});

const style = computed(() => {
  void tick.value;
  const rect = props.anchor.getBoundingClientRect();
  const W = 288;
  const GAP = 8;
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;
  const h = popHeight.value;
  const above = rect.bottom + h + GAP > vpH;
  const top = above ? Math.max(GAP, rect.top - h - GAP) : rect.bottom + GAP;
  const left = Math.max(GAP, Math.min(rect.left + rect.width / 2 - W / 2, vpW - W - GAP));
  return { top: `${top}px`, left: `${left}px` };
});

watch(
  () => props.anchor,
  async () => {
    await nextTick();
    popHeight.value = popEl.value?.offsetHeight ?? 260;
  },
  { immediate: true },
);

function onScroll() {
  tick.value++;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll, true);
});
</script>

<template>
  <div
    ref="popEl"
    :style="style"
    class="fixed z-50 w-72 max-w-[calc(100vw-2rem)] pointer-events-none bg-white dark:bg-slate-800 rounded-xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 border border-slate-200 dark:border-slate-700 p-3"
  >
    <!-- Foto da folha -->
    <div v-if="submission.imageUrl" class="mb-2 rounded-lg overflow-hidden ring-1 ring-slate-100 dark:ring-slate-700">
      <img
        :src="submission.imageUrl"
        :alt="`Folha de ${submission.studentName}`"
        class="w-full h-24 object-cover object-top"
        loading="lazy"
      />
    </div>

    <!-- Detalhes -->
    <div class="space-y-1.5">
      <div class="flex items-center justify-between text-[11px]">
        <span class="text-slate-400 dark:text-slate-500 font-medium">Acertos</span>
        <span class="font-bold text-slate-800 dark:text-slate-100">
          {{ submission.totalCorrect ?? 0 }}
          <span v-if="totalQuestions > 0" class="font-normal text-slate-400 dark:text-slate-500">
            / {{ totalQuestions }}
          </span>
        </span>
      </div>

      <div v-if="percentCorrect !== null" class="flex items-center justify-between text-[11px]">
        <span class="text-slate-400 dark:text-slate-500 font-medium">% Acerto</span>
        <span
          class="font-bold"
          :class="
            percentCorrect >= 70
              ? 'text-emerald-600 dark:text-emerald-400'
              : percentCorrect >= 50
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-600 dark:text-red-400'
          "
        >
          {{ percentCorrect }}%
        </span>
      </div>

      <div class="flex items-center justify-between text-[11px]">
        <span class="text-slate-400 dark:text-slate-500 font-medium">Data</span>
        <span class="text-slate-600 dark:text-slate-300 font-medium">{{ formattedDate }}</span>
      </div>
    </div>
  </div>
</template>
