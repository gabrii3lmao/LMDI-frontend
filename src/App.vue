<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import TheAside from "./components/TheAside.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { isRouteLoading } from "./router";
import { getSocket } from "./services/socket";

const queryClient = useQueryClient();

onMounted(() => {
  const socket = getSocket();
  if (!socket) return;

  socket.on("submission:completed", (data: { examId: string }) => {
    queryClient.invalidateQueries({ queryKey: ["submissoes", data.examId] });
    queryClient.invalidateQueries({ queryKey: ["analytics", data.examId] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  });
});

onUnmounted(() => {
  const socket = getSocket();
  socket?.off("submission:completed");
});
</script>

<template>
    <main class="min-h-screen bg-white dark:bg-slate-900 flex flex-col justify-center">
        <div v-if="isRouteLoading" class="fixed top-0 left-0 right-0 h-1 bg-emerald-500 animate-pulse z-50" />
        <TheAside />
        <Toast />
        <ConfirmDialog />
        <div class="page-content">
            <RouterView v-slot="{ Component }">
                <Transition name="page" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </div>
    </main>
</template>
