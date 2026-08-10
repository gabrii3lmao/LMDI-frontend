<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useScrollReveal } from "@/composables/useScrollReveal";
import LandingNav from "@/components/landing/LandingNav.vue";
import HeroCarousel from "@/components/landing/HeroCarousel.vue";
import ServicesSection from "@/components/landing/ServicesSection.vue";
import PortfolioSection from "@/components/landing/PortfolioSection.vue";
import PricingSection from "@/components/landing/PricingSection.vue";
import AboutFaqSection from "@/components/landing/AboutFaqSection.vue";
import TestimonialsSection from "@/components/landing/TestimonialsSection.vue";
import TeamSection from "@/components/landing/TeamSection.vue";
import ContactSection from "@/components/landing/ContactSection.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";

const router = useRouter();

useScrollReveal();

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.replace("/dashboard");
  }
});
</script>

<template>
  <div class="min-h-screen bg-white font-sans">
    <LandingNav />
    <main>
      <HeroCarousel />
      <ServicesSection />
      <!-- <PortfolioSection /> -->
      <PricingSection />
      <AboutFaqSection />
      <TestimonialsSection />
      <!-- <TeamSection /> -->
      <ContactSection />
    </main>
    <LandingFooter />
  </div>
</template>
