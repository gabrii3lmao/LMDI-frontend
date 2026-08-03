<script setup lang="ts">
interface TeamMember {
  photo: string;
  name: string;
  role: string;
  socials: { icon: string; label: string }[];
}

const team: TeamMember[] = [
  {
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
    name: "Eduardo Lima",
    role: "Fundador & CEO",
    socials: [
      { icon: "pi-facebook", label: "Facebook" },
      { icon: "pi-twitter", label: "Twitter" },
      { icon: "pi-instagram", label: "Instagram" },
      { icon: "pi-linkedin", label: "LinkedIn" },
    ],
  },
  {
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=70",
    name: "Mariana Duarte",
    role: "Head de Educação",
    socials: [
      { icon: "pi-facebook", label: "Facebook" },
      { icon: "pi-twitter", label: "Twitter" },
      { icon: "pi-instagram", label: "Instagram" },
      { icon: "pi-linkedin", label: "LinkedIn" },
    ],
  },
  {
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=70",
    name: "Thiago Alves",
    role: "Engenheiro de IA",
    socials: [
      { icon: "pi-facebook", label: "Facebook" },
      { icon: "pi-twitter", label: "Twitter" },
      { icon: "pi-instagram", label: "Instagram" },
      { icon: "pi-linkedin", label: "LinkedIn" },
    ],
  },
];
</script>

<template>
  <section id="equipe" class="scroll-mt-20 py-20 md:py-28 bg-slate-50">
    <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-14 md:mb-16 reveal">
        <p class="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Equipe</p>
        <h2 class="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Conheça nosso <span class="text-emerald-600">time</span>
        </h2>
        <p class="text-lg text-slate-500">Pessoas apaixonadas por educação e tecnologia.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(member, i) in team"
          :key="member.name"
          class="reveal group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
          :style="{ '--delay': i * 130 + 'ms' }"
        >
          <div class="relative overflow-hidden">
            <img
              :src="member.photo"
              :alt="`Foto de ${member.name}`"
              loading="lazy"
              class="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-lg font-bold text-slate-900">{{ member.name }}</h3>
            <p class="text-sm text-emerald-600 font-semibold mt-1">{{ member.role }}</p>
            <div class="flex items-center justify-center gap-2 mt-4">
              <a
                v-for="social in member.socials"
                :key="social.icon"
                href="#"
                :aria-label="`${social.label} de ${member.name}`"
                class="w-9 h-9 rounded-lg bg-slate-100 hover:bg-emerald-600 flex items-center justify-center text-slate-500 hover:text-white transition-all"
              >
                <i :class="['pi text-sm', social.icon]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
