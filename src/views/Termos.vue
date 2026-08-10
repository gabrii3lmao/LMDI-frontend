<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useToast } from "primevue/usetoast";
import api from "@/services/api";
import logLight from "@/assets/logo1.webp";
import logDark from "@/assets/logo-white.png";

const router = useRouter();
const themeStore = useThemeStore();
const toast = useToast();
const logoSrc = computed(() =>
  themeStore.theme === "dark" ? logDark : logLight,
);

const scrolled = ref(false);
function handleScroll() {
  scrolled.value = window.scrollY > 60;
}

const secoes = ref([
  {
    titulo: "1. Aceitação dos Termos",
    icon: "pi-check-circle",
    texto:
      "Ao acessar ou utilizar a plataforma LetMeDoIt, você concorda integralmente com estes Termos de Uso e com a nossa Política de Privacidade. Caso não concorde com qualquer parte destes termos, você não deve criar uma conta nem utilizar os nossos serviços. O aceite é condição indispensável para o cadastro e para o uso contínuo da plataforma.",
  },
  {
    titulo: "2. Definições",
    icon: "pi-book",
    texto:
      "Para fins destes Termos: 'Plataforma' refere-se ao site e serviços do LetMeDoIt; 'Usuário' é toda pessoa que cria uma conta, acessa ou utiliza a plataforma; 'Professor' é o usuário que cadastra turmas, gabaritos e provas; 'Cartão-resposta' é o documento preenchido pelo aluno e fotografado para correção; 'IA' refere-se ao modelo de inteligência artificial utilizado para processar e corrigir as provas; 'Conteúdo' abrange tudo o que for enviado, cadastrado ou gerado pelo usuário na plataforma.",
  },
  {
    titulo: "3. Descrição do Serviço",
    icon: "pi-cog",
    texto:
      "O LetMeDoIt é uma plataforma que oferece correção automática de provas por inteligência artificial. O professor cadastra suas turmas, define um gabarito modelo e submete fotografias dos cartões-resposta de seus alunos. A IA identifica as marcações, compara com o gabarito e gera as notas automaticamente. O serviço também oferece relatórios de desempenho e gestão de submissões para auxiliar o trabalho docente.",
  },
  {
    titulo: "4. Cadastro e Conta",
    icon: "pi-user",
    texto:
      "Para utilizar a plataforma é necessário criar uma conta com informações verdadeiras e atualizadas. Você é responsável por manter a confidencialidade das suas credenciais de acesso e por todas as atividades realizadas na sua conta. É proibido criar contas falsas, usar a identidade de terceiros ou compartilhar sua conta. A plataforma se reserva o direito de suspender ou excluir contas que violem estes Termos. O cadastro de menores de 18 anos deve ser realizado por responsável legal.",
  },
  {
    titulo: "5. Uso da Plataforma",
    icon: "pi-shield",
    texto:
      "O usuário se compromete a utilizar a plataforma apenas para fins legítimos e educacionais, em conformidade com a legislação vigente. É vedado: enviar conteúdo ilegal, ofensivo, discriminatório ou que viole direitos de terceiros; tentar acessar dados de outros usuários; realizar engenharia reversa, ou copiar, distribuir ou revender o serviço sem autorização; utilizar automação ou meios fraudulentos para obter vantagens indevidas.",
  },
  {
    titulo: "6. Correção por IA e Limitações",
    icon: "pi-warning",
    texto:
      "A correção é realizada por inteligência artificial e pode apresentar variações de precisão conforme a qualidade da imagem, iluminação e legibilidade do cartão-resposta. O LetMeDoIt busca alta taxa de acerto, mas não garante resultado infalível. O professor é o responsável final pela validação dos resultados, podendo revisar e corrigir manualmente qualquer nota. A plataforma não substitui o julgamento profissional do educador.",
  },
  {
    titulo: "7. Conteúdo e Propriedade Intelectual",
    icon: "pi-copyright",
    texto:
      "Todo o conteúdo enviado pelo usuário — turmas, provas, gabaritos e imagens de cartões — permanece de propriedade do usuário. Ao enviá-lo, você nos concede uma licença limitada para armazenar, processar e exibir o conteúdo exclusivamente para a prestação do serviço. A plataforma, seu código, logotipos, marcas e materiais são propriedade do LetMeDoIt e não podem ser utilizados sem autorização prévia por escrito.",
  },
  {
    titulo: "8. Privacidade e Proteção de Dados",
    icon: "pi-lock",
    texto:
      "O tratamento de dados pessoais, incluindo dados de alunos, é realizado em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Utilizamos criptografia para armazenamento e transmissão, não vendemos dados a terceiros e mantemos os dados armazenados em servidores seguros. Você pode solicitar acesso, correção ou exclusão completa dos seus dados a qualquer momento pelos nossos canais de contato.",
  },
  {
    titulo: "9. Planos, Assinatura e Cobrança",
    icon: "pi-credit-card",
    texto:
      "O LetMeDoIt oferece planos gratuitos e pagos. As condições de cada plano, valores e recursos estão descritas na página de Preços. Assinaturas pagas são renovadas automaticamente até o cancelamento, que pode ser feito a qualquer momento pela conta do usuário. Valores já pagos não são reembolsados, salvo previsão legal. Alterações de preço serão comunicadas com antecedência.",
  },
  {
    titulo: "10. Limitação de Responsabilidade",
    icon: "pi-exclamation-triangle",
    texto:
      "O serviço é fornecido 'no estado em que se encontra'. O LetMeDoIt não se responsabiliza por: interrupções do serviço, perda de dados decorrente de uso inadequado, decisões pedagógicas tomadas com base nas correções, ou danos indiretos, incidentais ou consequenciais. Nossa responsabilidade máxima fica limitada ao valor efetivamente pago pelo usuário nos últimos 12 meses.",
  },
  {
    titulo: "11. Suspensão e Encerramento",
    icon: "pi-times-circle",
    texto:
      "Você pode encerrar sua conta a qualquer momento pela área de Configurações. O LetMeDoIt pode suspender ou encerrar contas que violem estes Termos, apresentem uso fraudulento ou comprometam a segurança da plataforma. Encerrada a conta, os dados poderão ser excluídos após o período legal de retenção, conforme a LGPD.",
  },
  {
    titulo: "12. Alterações destes Termos",
    icon: "pi-pencil",
    texto:
      "Estes Termos podem ser atualizados periodicamente para refletir melhorias do serviço ou mudanças legais. A versão vigente estará sempre disponível nesta página com a data de atualização. Quando houver alterações relevantes, os usuários serão notificados por e-mail ou por aviso na plataforma. O uso contínuo após a atualização implica aceitação das novas condições; usuários que não concordarem deverão encerrar a conta.",
  },
  {
    titulo: "13. Legislação Aplicável e Foro",
    icon: "pi-gavel",
    texto:
      "Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Picos — PI para dirimir eventuais controvérsias, sem prejuízo de outras comarcas quando a legislação for imperativa para o consumidor.",
  },
  {
    titulo: "14. Contato",
    icon: "pi-envelope",
    texto:
      "Para dúvidas, solicitações relacionadas à LGPD ou comunicação de violações destes Termos, entre em contato pelo e-mail gabrielmluz56@gmail.com. Responderemos no prazo de até 10 dias úteis.",
  },
]);

const updatedAt = "10 de agosto de 2026";

async function handleAgree() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await api.post("/auth/accept-terms");
      localStorage.setItem("acceptedTermsAt", res.data.acceptedTermsAt || "");
      toast.add({
        severity: "success",
        summary: "Termos aceitos",
        detail: "Obrigado por aceitar os Termos de Uso.",
        life: 4000,
      });
      router.push("/dashboard");
      return;
    } catch {
      toast.add({
        severity: "error",
        summary: "Não foi possível registrar o aceite",
        detail: "Tente novamente em instantes.",
        life: 4000,
      });
    }
  }
  router.push("/signup");
}

function handleDisagree() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-lousa-900 font-sans">
    <!-- Navbar -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="
        scrolled
          ? 'bg-white/95 dark:bg-lousa-900/95 backdrop-blur-xl shadow-lg shadow-school-900/5 dark:shadow-black/30 border-b border-school-200/50 dark:border-lousa-700/50'
          : 'bg-white/80 dark:bg-lousa-900/80 backdrop-blur-md border-b border-transparent'
      "
    >
      <div
        class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 transition-all duration-300"
        :class="scrolled ? 'h-14' : 'h-16'"
      >
        <div class="flex items-center justify-between gap-2 h-full">
          <RouterLink to="/" class="flex items-center gap-2 sm:gap-3 shrink-0">
            <img :src="logoSrc" alt="LetMeDoIt" class="h-8 sm:h-9 w-auto" />
            <p class="text-base sm:text-xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight whitespace-nowrap">Let me <span class="text-indigo-600 dark:text-indigo-400">Do it</span></p>
          </RouterLink>
          <nav class="flex items-center gap-1.5 sm:gap-3">
            <RouterLink
              to="/signin"
              class="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-school-600 dark:text-lousa-400 hover:text-school-900 dark:hover:text-lousa-100 transition-colors whitespace-nowrap"
            >
              Entrar
            </RouterLink>
            <RouterLink
              to="/signup"
              class="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              Cadastre-se Grátis
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/60 to-white dark:from-lousa-800 dark:to-lousa-900">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent pointer-events-none"></div>
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold border border-borda-200 dark:border-borda-700">
            <i class="pi pi-file-contract text-xs"></i>
            Documento oficial
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-school-900 dark:text-lousa-100 tracking-tight leading-tight">
            Termos de <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">Uso</span>
          </h1>
          <p class="text-lg md:text-xl text-school-500 dark:text-lousa-400 max-w-2xl mx-auto">
            As regras que regem a sua utilização da plataforma LetMeDoIt.
          </p>
          <p class="text-sm text-school-400 dark:text-lousa-500">Última atualização: {{ updatedAt }}</p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              @click="handleAgree"
              class="w-full sm:w-auto px-8 py-3 text-base font-bold text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <i class="pi pi-check-circle mr-2"></i>
              Concordo com os Termos
            </button>
            <button
              @click="handleDisagree"
              class="w-full sm:w-auto px-8 py-3 text-base font-bold text-school-600 dark:text-lousa-300 bg-white dark:bg-lousa-800 hover:bg-school-50 dark:hover:bg-lousa-700 border border-school-200 dark:border-lousa-700 rounded-xl transition-all active:scale-95"
            >
              <i class="pi pi-times-circle mr-2"></i>
              Não concordo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="pb-20 md:pb-28 -mt-6 relative z-10">
      <div class="max-w-4xl mx-auto px-6">
        <div
          v-for="(secao, index) in secoes"
          :key="secao.titulo"
          class="mb-6 last:mb-0"
        >
          <div
            class="bg-school-50 dark:bg-lousa-800/50 border border-school-200 dark:border-lousa-700 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-borda-200 dark:hover:border-borda-700 hover:shadow-lg hover:shadow-indigo-500/5"
            :style="{ transitionDelay: `${index * 20}ms` }"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                <i :class="['pi', secao.icon, 'text-indigo-600 dark:text-indigo-400 text-lg']"></i>
              </div>
              <div>
                <h2 class="text-lg font-bold text-school-900 dark:text-lousa-100 mb-2">
                  {{ secao.titulo }}
                </h2>
                <p class="text-sm text-school-500 dark:text-lousa-400 leading-relaxed">
                  {{ secao.texto }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA final -->
        <div
          class="mt-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 md:p-10 text-center shadow-xl shadow-indigo-600/20"
        >
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            Você concorda com estes termos?
          </h2>
          <p class="text-indigo-100 text-sm md:text-base mb-6 max-w-lg mx-auto">
            Para continuar usando a plataforma, é necessário aceitar os Termos de Uso. Caso não concorde, sua conta não poderá ser utilizada.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              @click="handleAgree"
              class="w-full sm:w-auto px-8 py-3 text-base font-bold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl transition-all shadow-lg active:scale-95"
            >
              <i class="pi pi-check-circle mr-2"></i>
              Concordo com os Termos
            </button>
            <button
              @click="handleDisagree"
              class="w-full sm:w-auto px-8 py-3 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition-all active:scale-95"
            >
              <i class="pi pi-times-circle mr-2"></i>
              Não concordo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-school-900 text-school-400">
      <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img :src="logoSrc" alt="LetMeDoIt" class="h-8 w-auto" />
          </div>
          <p class="text-sm text-school-500 leading-relaxed max-w-xs">
            Plataforma inteligente para correção automática de provas e gestão de submissões escolares.
          </p>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Produto</h4>
          <nav class="flex flex-col gap-3">
            <RouterLink to="/signup" class="text-sm text-school-400 hover:text-white transition-colors">Cadastre-se</RouterLink>
            <RouterLink to="/signin" class="text-sm text-school-400 hover:text-white transition-colors">Entrar</RouterLink>
            <RouterLink to="/pricing" class="text-sm text-school-400 hover:text-white transition-colors">Preços</RouterLink>
            <RouterLink to="/perguntas-frequentes" class="text-sm text-school-400 hover:text-white transition-colors">FAQ</RouterLink>
          </nav>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Empresa</h4>
          <nav class="flex flex-col gap-3">
            <RouterLink to="/" class="text-sm text-school-400 hover:text-white transition-colors">Sobre Nós</RouterLink>
            <RouterLink to="/termos" class="text-sm text-indigo-400 hover:text-white transition-colors font-semibold">Termos de Uso</RouterLink>
          </nav>
        </div>
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-widest">Entre em contato</h4>
          <nav class="flex flex-col gap-3">
            <a href="mailto:gabrielmluz56@gmail.com" class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2">
              <i class="pi pi-envelope text-xs text-indigo-400"></i>
              gabrielmluz56@gmail.com
            </a>
            <a href="tel:+5589994268109" class="text-sm text-school-400 hover:text-white transition-colors flex items-center gap-2">
              <i class="pi pi-phone text-xs text-indigo-400"></i>
              +55 (89) 99426-8109
            </a>
          </nav>
        </div>
      </div>
      <div class="border-t border-school-800 py-6">
        <div class="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-school-600">&copy; 2026 LetMeDoIt. Todos os direitos reservados.</p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">Privacidade</a>
            <RouterLink to="/termos" class="text-xs text-school-600 hover:text-school-400 transition-colors">Termos</RouterLink>
            <a href="#" class="text-xs text-school-600 hover:text-school-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
