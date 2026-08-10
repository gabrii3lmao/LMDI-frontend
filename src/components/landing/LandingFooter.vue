<script setup lang="ts">
import { RouterLink } from "vue-router";
import logoWhite from "@/assets/logo-white.png";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <footer class="bg-school-900 text-school-400">
    <div
      class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
    >
      <!-- Marca -->
      <div class="space-y-4">
        <a href="#inicio" class="flex items-center gap-2" @click.prevent="scrollTop">
          <img :src="logoWhite" alt="Logo LetMeDoIt" class="h-8 w-auto" />
        </a>
        <p class="text-sm text-school-500 leading-relaxed max-w-xs">
          Plataforma inteligente para correção automática de provas e gestão de submissões
          escolares.
        </p>
        <div class="flex items-center gap-3 pt-2">
          <a
            href="https://www.instagram.com/letmedoit_ifpi"
            aria-label="Instagram"
            class="w-9 h-9 rounded-lg bg-school-800 hover:bg-indigo-600 flex items-center justify-center text-school-400 hover:text-white transition-all"
          >
            <i class="pi pi-instagram text-sm"></i>
          </a>
        </div>
      </div>

      <!-- Produto -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold text-white uppercase tracking-widest">Produto</h3>
        <nav class="flex flex-col gap-3">
          <a
            href="#servicos"
            @click.prevent="scrollTo('servicos')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            Serviços
          </a>
          <a
            href="#portfolio"
            @click.prevent="scrollTo('portfolio')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            Portfólio
          </a>
          <a
            href="#precos"
            @click.prevent="scrollTo('precos')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            Preços
          </a>
          <a
            href="#sobre"
            @click.prevent="scrollTo('sobre')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
          <RouterLink
            to="/doar"
            class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <i class="pi pi-heart text-xs text-indigo-400"></i>
            Apoiar o projeto
          </RouterLink>
        </nav>
      </div>

      <!-- Empresa -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold text-white uppercase tracking-widest">Empresa</h3>
        <nav class="flex flex-col gap-3">
          <a
            href="#sobre"
            @click.prevent="scrollTo('sobre')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            Sobre Nós
          </a>
          <a
            href="#equipe"
            @click.prevent="scrollTo('equipe')"
            class="text-sm text-school-400 hover:text-white transition-colors"
          >
            Equipe
          </a>
          <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">Blog</a>
          <a href="#" class="text-sm text-school-400 hover:text-white transition-colors">
            Termos de Uso
          </a>
        </nav>
      </div>

      <!-- Contato rápido -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold text-white uppercase tracking-widest">Entre em contato</h3>
        <nav class="flex flex-col gap-3">
          <a
            href="mailto:gabrielmluz56@gmail.com"
            class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <i class="pi pi-envelope text-xs text-indigo-400"></i>
            gabrielmluz56@gmail.com
          </a>
          <a
            href="tel:+5589994268109"
            class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <i class="pi pi-phone text-xs text-indigo-400"></i>
            +55 (89) 99426-8109
          </a>
          <a
            href="#contato"
            @click.prevent="scrollTo('contato')"
            class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <i class="pi pi-map-marker text-xs text-indigo-400"></i>
            IFPI Campus Picos · Picos - PI
          </a>
        </nav>
      </div>
    </div>

    <!-- Créditos -->
    <div class="border-t border-school-800 py-6">
      <div
        class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-xs text-school-600">&copy; 2026 LetMeDoIt. Todos os direitos reservados.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">
            Privacidade
          </a>
          <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">
            Termos
          </a>
          <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
