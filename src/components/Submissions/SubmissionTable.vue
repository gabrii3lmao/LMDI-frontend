<script setup lang="ts">
import type { Submission } from "@/types/Submission";

defineProps<{
  submissions: Submission[];
}>();

defineEmits<{
  open: [sub: Submission];
  edit: [sub: Submission];
  delete: [sub: Submission];
  reprocess: [sub: Submission];
}>();
</script>

<template>
  <div
    class="bg-white dark:bg-lousa-800 border border-school-200 dark:border-lousa-700 rounded-2xl overflow-hidden ring-1 ring-school-300 dark:ring-lousa-700 shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead
          class="bg-school-50/75 dark:bg-lousa-700/50 text-xs uppercase text-school-500 dark:text-lousa-400 font-bold tracking-wider border-b border-school-400/60 dark:border-lousa-600"
        >
          <tr>
            <th class="p-4 px-6 font-semibold">Nome do Aluno</th>
            <th class="p-4 px-6 font-semibold">Status</th>
            <th class="p-4 px-6 text-right font-semibold">Nota</th>
            <th class="p-4 px-6 text-right font-semibold w-36">Ações</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-school-100 dark:divide-lousa-700">
          <tr
            v-for="sub in submissions"
            :key="sub._id"
            class="hover:bg-school-50/50 dark:hover:bg-lousa-700/30 transition-colors group"
          >
            <td
              class="p-4 px-6 cursor-pointer"
              @click="$emit('open', sub)"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-900/40 border border-borda-100 dark:border-borda-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0"
                >
                  {{
                    sub.studentName
                      ? sub.studentName.charAt(0).toUpperCase()
                      : "?"
                  }}
                </div>
                <span
                  class="text-school-700 dark:text-lousa-300 font-semibold"
                >
                  {{ sub.studentName }}
                </span>
              </div>
            </td>

            <td class="p-4 px-6">
              <span
                :class="[
                  'inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded',
                  sub.status === 'success'
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-borda-100 dark:border-borda-800'
                    : sub.status === 'pending'
                      ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800'
                      : 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800',
                ]"
              >
                <i
                  v-if="sub.status === 'pending'"
                  class="pi pi-spin pi-spinner text-[10px]"
                ></i>
                <i
                  v-else-if="sub.status === 'success'"
                  class="pi pi-check text-[10px]"
                ></i>
                <i v-else class="pi pi-times text-[10px]"></i>
                {{
                  sub.status === "success"
                    ? "Corrigido"
                    : sub.status === "pending"
                      ? "Processando..."
                      : "Erro na Leitura"
                }}
              </span>
            </td>

            <td class="p-4 px-6 text-right">
              <div
                v-if="sub.score !== undefined"
                class="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-borda-100 dark:border-borda-800"
              >
                <span class="text-sm font-bold text-indigo-700 dark:text-indigo-300">{{
                  sub.score
                }}</span>
              </div>

              <div
                v-else
                class="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-school-100 dark:bg-lousa-700 border border-school-200 dark:border-lousa-600"
              >
                <span class="text-xs font-semibold text-school-500 dark:text-lousa-400"
                  >-</span
                >
              </div>
            </td>

            <td class="p-4 px-6 text-right">
              <div class="flex items-center justify-end gap-1">
                <button
                  v-if="sub.status === 'error'"
                  @click.stop="$emit('reprocess', sub)"
                  title="Reenviar para IA"
                  class="p-2 rounded-lg text-school-400 dark:text-lousa-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all"
                >
                  <i class="pi pi-refresh text-sm"></i>
                </button>
                <button
                  @click.stop="$emit('edit', sub)"
                  title="Editar"
                  class="p-2 rounded-lg text-school-400 dark:text-lousa-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                >
                  <i class="pi pi-pencil text-sm"></i>
                </button>
                <button
                  @click.stop="$emit('delete', sub)"
                  title="Excluir"
                  class="p-2 rounded-lg text-school-400 dark:text-lousa-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
                >
                  <i class="pi pi-trash text-sm"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
