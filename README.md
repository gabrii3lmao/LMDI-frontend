# Let Me Do It — Frontend

[![Vue](https://img.shields.io/badge/Vue%203-4FC08D?logo=vuedotjs&logoColor=fff)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-41B883?logo=prime&logoColor=fff)](https://primevue.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD859?logo=pinia&logoColor=000)](https://pinia.vuejs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=fff)](https://tanstack.com/query/latest)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=fff)](https://socket.io/)
[![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?logo=google&logoColor=fff)](https://developers.google.com/identity/protocols/oauth2)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](/)

**Let Me Do It** é uma plataforma web que automatiza a correção de provas e gabaritos usando Inteligência Artificial. O professor tira uma foto da prova, e o sistema — via Google Gemini — extrai as respostas, calcula a nota e organiza tudo por turma e exame.

Este repositório contém o **frontend** da aplicação, uma SPA construída com Vue 3. Ele se comunica com uma **API REST + WebSocket** (backend privado hospedado no Render) para autenticação, dados e atualizações em tempo real.

**Aplicação em produção:** [https://letmedoit.app.br](https://letmedoit.app.br)

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🏠 **Landing page** | Site institucional com Hero, serviços, planos, FAQ, equipe, depoimentos e contato |
| 🔐 **Autenticação** | Cadastro e login por e-mail/senha ou **Google OAuth**, verificação de e-mail e recuperação de senha |
| 📊 **Dashboard** | Estatísticas gerais (turmas, gabaritos, correções), turmas recentes e atividade em tempo real |
| 🏫 **Gestão de turmas** | Crie, edite e exclua turmas |
| ✅ **Gabaritos Mestres** | Crie, edite e exclua o gabarito oficial (questões, alternativas e respostas) por turma |
| 📸 **Correção por foto** | Envie fotos das provas; a IA extrai e corrige automaticamente em background |
| ⚡ **Atualização em tempo real** | Status das correções via WebSocket (Socket.IO) + polling automático de 3s enquanto houver pendências |
| 📝 **Submissões** | Filtros por turma/prova, visualização detalhada, edição manual de respostas/nota, exportação de relatório (CSV/Excel) e reprocessamento individual ou em lote |
| 📈 **Analytics** | Gráficos de distribuição de notas, acerto por questão e desempenho por aluno (Chart.js) |
| ⚙️ **Configurações** | Perfil, foto de avatar, alteração de senha, tema claro/escuro e exclusão de conta |
| 💳 **Doações** | Doação pontual ou recorrente via **ASAAS** (PIX, cartão de crédito ou boleto) |
| 💰 **Planos** | Página de preços com os planos Grátis, Profissional e Empresarial |
| 🌙 **Tema "Lousa"** | Tema escuro verde-acinzentado com detecção automática de preferência do sistema |
| 📱 **Responsivo** | Interface adaptada para mobile e desktop, com sidebar em drawer |

---

## Tecnologias Utilizadas

- **Vue 3** (Composition API, `<script setup lang="ts">`) — Framework da interface
- **TypeScript** — Tipagem estática
- **Vite** — Build tool de desenvolvimento
- **Tailwind CSS** — Estilização utilitária (paletas `school`, `lousa`, `borda`)
- **PrimeVue 4** (tema Aura) + PrimeIcons — Componentes de UI
- **Pinia** — Gerenciamento de estado local (tema)
- **Vue Router 4** — Roteamento SPA com guarda de autenticação
- **TanStack Vue Query** — Estado de servidor, cache e auto-polling
- **Axios** — Cliente HTTP (com interceptors e renovação de token)
- **Socket.IO Client** — Atualizações em tempo real (correções concluídas)
- **Chart.js + vue-chartjs** — Gráficos do Analytics
- **vue3-google-login** — Login com conta Google

---

## Arquitetura

- **Bootstrap** (`src/main.ts`): registra PrimeVue (preset `LousaPreset` com dark mode), Pinia, Router, TanStack Vue Query, Toast/Confirmation services e o login do Google; conecta o Socket.IO quando há sessão.
- **Roteamento** (`src/router/index.ts`): rotas com lazy loading; guarda de auth verificando o token no `localStorage`; páginas públicas usam `meta: { hideSidebar: true }`.
- **Camada de API** (`src/services/api.ts`): instância Axios com `withCredentials`, token `Bearer` automático e interceptor 401 com **fila de refresh token** (renova e reexecuta as requisições pendentes; reconecta o Socket.IO após renovar).
- **Serviços**: wrappers de API por domínio — `examService`, `submissionService`, `turmas`, `dashboardService` e `donationService`.
- **WebSocket** (`src/services/socket.ts`): singleton com reconexão automática; o evento `submission:completed` invalida as queries TanStack (`submissoes`, `analytics`, `dashboard`).
- **Composables**: `useExams` (provas + submissões com polling de 3s quando há pendências), `useGabaritos` (query dependente — gabaritos só carregam após as turmas) e `useScrollReveal`.
- **Estado**: store Pinia de tema (`light`/`dark`) com persistência e detecção da preferência do sistema.
- **Layout** (`src/App.vue`): sidebar responsiva (`TheAside.vue`), toasts, diálogo de confirmação e prompt de apoio (`SupportPrompt`).

### Fluxo de correção

O envio das fotos é **assíncrono**: o usuário não precisa aguardar a resposta da IA. O upload é delegado à fila (Redis + BullMQ) e processado em background por um worker, que usa o Google Gemini para extrair e corrigir as respostas. Ao concluir, o backend salva o resultado e emite o evento `submission:completed` via WebSocket; o frontend invalida o cache (TanStack Query) e, enquanto houver submissões pendentes, mantém um polling a cada 3 segundos.

```
 ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐
 │ FRONTEND  │──▶│   API     │──▶│   FILA    │──▶│  WORKER   │
 │ 1. Upload │    │ 2. Enq.   │    │ Redis/    │    │ 4. Envia  │
 │  das fotos│    │  job      │    │ BullMQ    │    │ ao Gemini │
 └───────────┘    └───────────┘    └───────────┘    └─────┬─────┘
       ▲                                                  │
       │                                                  ▼
 ┌─────┴─────┐    ┌───────────┐                   ┌───────────┐
 │ FRONTEND  │◀──│   API     │◀────────────────-│  GEMINI   │
 │ 6. Status │    │ 5. Salva  │   respostas/nota  │  AI (OCR  │
 │ tempo real│    │ resultado │                   │ +correção)│
 └───────────┘    └───────────┘                   └───────────┘
```

### Estrutura de pastas

```
src/
  main.ts                    # Bootstrap do app
  App.vue                    # Layout raiz: sidebar + router-view
  assets/main.css            # Diretivas Tailwind + fontes
  router/index.ts            # Rotas + guarda de autenticação
  services/                  # Camada de API (axios, socket, serviços por domínio)
  composables/               # Wrappers do TanStack Query e utilidades
  stores/                    # Pinia (tema claro/escuro)
  types/                     # Tipos do domínio (Exam, Submission, Turma, ...)
  components/
    TheAside.vue             # Sidebar responsiva + drawer mobile
    landing/                 # Seções da página institucional
    Classes/                 # Componentes de turmas
    Exams/                   # Componentes de gabaritos/provas
    Submissions/             # Componentes de submissões
    donation/                # Doações (ASAAS)
    common/                  # Paginação, spinner, upload
  views/
    auth/                    # Login, Cadastro, recuperação e verificação
    Landing.vue              # Página institucional
    Precos.vue               # Planos
    Doar.vue                 # Doações
    LandingFAQ.vue           # Perguntas frequentes (pública)
    Home.vue                 # Dashboard
    TurmasDashboard.vue      # /classes
    Turma.vue                # /classes/:id — provas da turma
    Gabaritos.vue            # /templates — gabaritos mestres
    Submissoes.vue           # /submissions
    Analytics.vue            # /analytics — gráficos de desempenho
    Configuracoes.vue        # /settings
    utils/                   # Dúvidas (FAQ autenticado), NotFound
```

---

## Consumo da API

O frontend consome o backend privado do Let Me Do It:

- **REST** sob `/api` — autenticação (`/auth`), turmas (`/classes`), provas (`/exams`), submissões (`/submissions`), dashboard e doações (`/payments/donations`).
- **WebSocket (Socket.IO)** — autenticado via token, recebe o evento `submission:completed`.

Em desenvolvimento a base é `http://localhost:3000/api`; em produção é definida por `VITE_BACKEND_URL`.

---

## Scripts

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Type-check + build em paralelo (`npm-run-all2`) |
| `npm run build-only` | Apenas `vite build` |
| `npm run type-check` | `vue-tsc --build` |
| `npm run preview` | Pré-visualização do build |

Requisitos: **Node.js >=20.19.0 ou >=22.12.0**.

---

## Deploy

A aplicação é publicada na **Vercel** (configuração padrão, sem arquivo de configuração no repositório) em **https://letmedoit.app.br**.

---

## Licença

Todos os direitos reservados. Este software é disponibilizado publicamente apenas para visualização. Não é permitido copiar, modificar, distribuir ou utilizar o código sem autorização explícita do autor. Veja o arquivo `LICENSE` para mais informações.

---

## Autor

Desenvolvido por **Gabriel Luz** como projeto de estudo e aplicação prática para a disciplina de Projeto Integrador.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff)](www.linkedin.com/in/gabrielmluz)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff)](https://github.com/gabrii3lmao)

---

> ⚠️ **Nota:** O backend deste projeto é mantido em repositório privado para preservar chaves de API e configurações de infraestrutura. Este frontend é a vitrine pública do sistema.
