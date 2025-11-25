'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  highlight?: string;
  footer?: string;
};

const slides: Slide[] = [
  {
    id: 'capa',
    title: 'Gente e Cultura T.Group',
    subtitle: 'Análise do cenário atual e plano 2026',
    highlight: 'De um exército de uma só pessoa para um sistema de pessoas da holding.'
  },
  {
    id: 'contexto',
    title: '1. Apresentação e contexto',
    bullets: [
      'O T.Group é uma holding de entretenimento com vocações complementares.',
      'Empresas: T.Youth, T.Brands, T.Dreams, T.Venues e WAS.',
      'Essência: criar experiências relevantes para pessoas, marcas e públicos diversos.',
      'Base do negócio: times jovens, criativos e intensos, com prazos curtos e alta expectativa de entrega.'
    ],
    footer: 'Contexto geral do negócio e da importância de Gente e Cultura para a holding.'
  },
  {
    id: 'gc-hoje',
    title: '2. O que é Gente e Cultura no T.Group hoje',
    bullets: [
      'Evolução do antigo RH para uma área que cuida de pessoas, cultura e experiência.',
      'Atende todas as empresas da holding como hub consultivo para lideranças e sócios.',
      'Responsável por recrutamento, admissões, desligamentos, benefícios e interface com financeiro/contabilidade.',
      'Guardião da cultura, rituais internos e “cara interna” do T.Group.',
      'Sponsor de Facilities e da gestão da sede, além de criador de ferramentas digitais internas.'
    ]
  },
  {
    id: 'escopo-geral',
    title: '3. Escopo real de Gente e Cultura',
    subtitle: 'Visão geral',
    bullets: [
      'Recrutamento e Seleção de ponta a ponta.',
      'Admissão e integração (onboarding ainda fragmentado).',
      'Desligamentos e offboarding.',
      'DP, folha PJ, NF-Express e rotinas burocráticas.',
      'Atendimento consultivo às empresas e lideranças.',
      'Cultura, rituais e experiência do colaborador.',
      'Facilities, gestão da casa e relação com vizinhança.',
      'Google Workspace, domínios e “TI de gente”.',
      'Benefícios e proposta de valor ao colaborador.'
    ]
  },
  {
    id: 'rs',
    title: '3.1. Recrutamento e Seleção',
    bullets: [
      'Recebimento do pedido da liderança de qualquer empresa do grupo.',
      'Desenho e arte da vaga, criação de estrutura no Drive e publicação em canais (LinkedIn, redes).',
      'Triagem de currículos, contato com candidatos e organização das etapas (entrevistas, testes, cases).',
      'Aplicação de teste DISC e entrevistas focadas em alinhamento cultural e perfil profissional.',
      'Contato com aprovados, retorno para reprovados e fechamento do processo – tudo concentrado em GC.'
    ]
  },
  {
    id: 'admissao',
    title: '3.2. Admissão e integração',
    subtitle: 'Onboarding ainda fragmentado',
    bullets: [
      'Envio de proposta, coleta de dados, atualização de planilhas e orientações para abertura de MEI.',
      'Suporte sobre emissão de notas fiscais e comunicação de benefícios (TotalPass, Petin, Capacitar, convênios).',
      'Criação de arte de boas-vindas, inclusão em grupos e criação de e-mail corporativo.',
      'Alinhamento com financeiro e contabilidade em datas de pagamento e cálculos proporcionais.',
      'Ainda não existe um fluxo único de onboarding com ritual mensal, vídeo institucional, dinâmicas e kit oficial.'
    ]
  },
  {
    id: 'desligamentos',
    title: '3.3. Desligamentos',
    bullets: [
      'Condução da conversa de desligamento (preferência por formato presencial).',
      'Contato com contabilidade para extrato de rescisão (PJ e CLT) e assinatura de termos.',
      'Atualização de planilhas, comunicação de pagamentos ao financeiro e cancelamento de acessos.',
      'Ainda não há entrevistas de desligamento estruturadas com registro sistemático de aprendizados e indicadores.'
    ]
  },
  {
    id: 'dp',
    title: '3.4. DP, folha e rotinas burocráticas',
    bullets: [
      'Folha CLT terceirizada (NOU), mas grande parte de People Ops concentrada em GC.',
      'Plataforma NF-Express criada internamente para upload de notas fiscais.',
      'Envio mensal de comunicados, atualização de planilhas, cobrança de NFs em atraso e suporte a novos colaboradores.',
      'Relatórios de TotalPass e Google Workspace, controle de gastos com cartão e reembolsos de esportes.',
      'Na prática, uma estrutura de DP/People Ops operada por uma pessoa, com apoio do sócio Vinicius David.'
    ]
  },
  {
    id: 'consultivo',
    title: '3.5. Atendimento às empresas e papel consultivo',
    bullets: [
      'Orientação de líderes em gestão de pessoas, conflitos e feedback.',
      'Análises de clima, escutas individuais e intervenções pontuais.',
      'Apoio na construção de planos de desenvolvimento de lideranças e redesenho de funções/fluxos.',
      'Papel de “ombudsman” interno, recebendo demandas sensíveis de colaboradores.',
      'GC já atua como parceiro de negócio da holding, sem estrutura proporcional a esse papel.'
    ]
  },
  {
    id: 'cultura-rituais',
    title: '3.6. Cultura, rituais e experiência do colaborador',
    bullets: [
      'Organização de Esportes T.Group (society e vôlei de areia).',
      'Café com T – apresentação, café, comunicações, montagem e condução.',
      'Aniversariantes do mês, Happy Hour, agenda de massagista e manicure.',
      'Confraternização anual do grupo e apoio a confraternizações por empresa.',
      'Rituais fundamentais para engajamento, mas operados 100% de forma manual por GC.'
    ]
  },
  {
    id: 'facilities',
    title: '3.7. Facilities e gestão da casa',
    bullets: [
      'Mentoria à liderança de Facilities e apoio em limpeza, organização, cozinha e melhorias.',
      'Participação em decisões de reformas e prioridades da sede.',
      'Responsabilidade pela relação com vizinhos, inclusive em situações de barulho e reclamações.',
      'Negociação e renovação de contratos com imobiliária, seguros e itens ligados à casa.',
      'GC se torna guardião da experiência física da sede, aumentando o escopo da área.'
    ]
  },
  {
    id: 'ti-gente',
    title: '3.8. Google Workspace, domínios e TI de gente',
    bullets: [
      'Criação e cancelamento de e-mails, gestão de permissões e Drives.',
      'Configuração e manutenção de domínios em Locaweb e GoDaddy (DNS, SPF, DKIM).',
      'Gestão de renovações e cortes de serviços não utilizados.',
      'Criação de soluções internas: Check-in de almoço, NF-Express, HR Ops, T.Facilities Hub/Rotas, dashboards em Looker Studio.',
      'Automação interna rara para agências do porte do T.Group, mas concentrada em uma única pessoa.'
    ]
  },
  {
    id: 'beneficios',
    title: '3.9. Benefícios e proposta de valor ao colaborador',
    bullets: [
      'Benefícios atuais: TotalPass, Petin, Capacitar/Udemy, convênios educacionais.',
      'Análise de propostas de benefícios flexíveis (iFood Benefícios, Caju), plano de saúde (Tailor) e plataforma de performance (Qulture.Rocks).',
      'Mercado mostra que benefícios estratégicos aumentam retenção e atração de talentos.',
      'Hoje o T.Group tem bons elementos, mas ainda não um pacote estruturado e comunicado como “proposta de valor” única.'
    ]
  },
  {
    id: 'riscos-resumo',
    title: '4. Riscos do modelo atual',
    bullets: [
      'GC é estratégico e reconhecido pelos times, mas operado de forma artesanal.',
      'Dependência extrema de uma pessoa (Head) para operações críticas.',
      'Sobreposição de frentes que aumenta risco de burnout e de erros operacionais.',
      'Variação na experiência do colaborador entre empresas e momentos.',
      'Risco de GC virar gargalo do crescimento da holding se nada mudar.'
    ]
  },
  {
    id: 'principios',
    title: '5. Princípios norteadores para 2026',
    bullets: [
      'GC como área estratégica, não apenas operacional.',
      'Divisão clara entre estratégia (Head) e operação (DP/People Ops).',
      'Experiência do colaborador unificada em toda a holding.',
      'Decisões orientadas por dados de gente (turnover, engajamento, performance, benefícios).',
      'Ferramentas alinhadas ao time jovem e digital do T.Group.',
      'Cuidado também com quem cuida: sustentabilidade do papel de GC.'
    ]
  },
  {
    id: 'objetivos',
    title: '6. Objetivos estratégicos de GC para 2026',
    bullets: [
      '1. Reestruturar GC, criando uma célula interna de DP/People Ops.',
      '2. Padronizar a jornada do colaborador (entrada, desenvolvimento, saída).',
      '3. Implantar ciclo de performance e desenvolvimento com apoio de plataforma.',
      '4. Fortalecer a proposta de valor ao colaborador (benefícios + cultura + rituais + reconhecimento).',
      '5. Digitalizar a comunicação de GC (HR Ops + intranet) e consolidar People Analytics.'
    ]
  },
  {
    id: 'frente-estrutura',
    title: '7.1. Estrutura e time de GC',
    subtitle: 'Frente 1 – Estrutura e DP/People Ops',
    bullets: [
      'Desenhar organograma mínimo: Head de GC + Analista de DP/People Ops.',
      'Business case: comparar custo atual de DP terceirizado + tempo de GC x modelo híbrido.',
      'Ganhos esperados: menos erros, mais agilidade em admissões/desligamentos e mais tempo estratégico do Head.',
      'Cronograma: Q1 desenho e validação, Q2 contratação, Q3 transição, Q4 revisão do modelo.'
    ]
  },
  {
    id: 'frente-onboarding',
    title: '7.2. Recrutamento, onboarding e jornada 0–90 dias',
    bullets: [
      'Playbook de recrutamento T.Group com etapas, SLAs e modelos de comunicação.',
      'Integração do fluxo de R&S ao HR Ops com visão em kanban por vaga.',
      'Jornada 0–90 dias com marcos: Dia 0, primeira semana, Dia 30, 60 e 90.',
      'Encontro de Boas-Vindas mensal da holding com café da manhã, vídeo e dinâmicas.',
      'Kit de boas-vindas oficial, alinhado ao DNA do T.Group.'
    ]
  },
  {
    id: 'frente-dp',
    title: '7.3. DP interno e People Ops',
    bullets: [
      'Mapear todos os processos atuais de DP/People Ops e donos de cada etapa.',
      'Redesenhar responsabilidades entre Analista de DP, NOU, Financeiro e Head de GC.',
      'Conectar fluxos ao HR Ops para permitir acompanhamento de solicitações pelos colaboradores.',
      'Reduzir retrabalho e centralização em mensagens avulsas.'
    ]
  },
  {
    id: 'frente-performance',
    title: '7.4. Performance, PDI e desenvolvimento de lideranças',
    bullets: [
      'Definir modelo de avaliação de desempenho com ciclo anual + checkpoints.',
      'Estruturar um modelo de PDI simples, com metas, ações, prazos e evidências.',
      'Avaliar implantação de plataforma (Qulture.Rocks ou similar) para metas, feedbacks e 1:1.',
      'Oferecer capacitações focadas em liderança, feedback e uso de dados de performance.'
    ]
  },
  {
    id: 'frente-cultura',
    title: '7.5. Cultura, rituais e reconhecimento',
    bullets: [
      'Construir calendário anual de GC com todos os rituais mapeados.',
      'Distribuir responsabilidades: GC como curador, Facilities como executor físico, empresas como co-donas.',
      'Criar programa de reconhecimento por tempo de casa (1, 3, 5, 7 e 10 anos).',
      'Conectar presentes e rituais à identidade do T.Group.'
    ]
  },
  {
    id: 'frente-beneficios',
    title: '7.6. Benefícios e proposta de valor',
    bullets: [
      'Mapear e comunicar com clareza benefícios já existentes.',
      'Realizar pesquisa interna de benefícios para entender prioridades do time.',
      'Avaliar benefícios flexíveis (iFood, Caju), plano de saúde/odontológico (Tailor) e outros.',
      'Criar Manual de Benefícios T.Group na intranet, com linguagem simples e exemplos.'
    ]
  },
  {
    id: 'frente-facilities-ti',
    title: '7.7–7.9. Facilities, TI de gente e People Analytics',
    bullets: [
      'Finalizar e implantar a Bíblia de Facilities, com rotinas e checklists digitais (T.Facilities + QR Codes).',
      'Evoluir HR Ops para porta oficial de entrada de demandas de GC.',
      'Desenvolver a Intranet T.Group como “lar digital” de políticas, calendário e benefícios.',
      'Definir painel mínimo de indicadores de gente e consolidar em dashboard executivo (Looker Studio).'
    ]
  },
  {
    id: 'roadmap',
    title: '8. Roadmap 2026 – visão geral',
    bullets: [
      'Q4 2025: aprovação do plano, desenho de organograma, mapeamento de processos, Jornada 0–90 e calendário GC.',
      'Q1 2026: contratação do Analista de DP, início do playbook de R&S, primeiro Encontro de Boas-Vindas, MVP de intranet, pesquisa de benefícios.',
      'Q2 2026: Analista assumindo rotinas de DP, implementação do ciclo de performance, definição/implantação de novo pacote de benefícios, intranet GC/Facilities no ar.',
      'Q4 2026: primeiro ciclo de performance concluído, revisão do modelo de DP, consolidação do programa de reconhecimento e apresentação de resultados de GC 2026 aos sócios.'
    ]
  },
  {
    id: 'conclusao',
    title: '9. Conclusão',
    highlight:
      'GC deixa de ser apenas um novo nome para RH e se afirma como um sistema de pessoas da holding.',
    bullets: [
      'Organizar melhor o que já existe, distribuindo responsabilidades e trazendo gente certa para somar.',
      'Usar dados e tecnologia a favor de quem faz o T.Group acontecer todos os dias.',
      'Não é fazer mais coisas, é fazer do jeito certo, com estrutura, processos e ferramentas adequadas.',
      'GC se posiciona como área tecnológica, estratégica e protagonista do futuro do T.Group.'
    ],
    footer: '“Não é RH, é Gente e Cultura.”'
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98
  })
};

export default function GC2026DeckPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;
  const current = slides[index];

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= total) return;
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goTo(index + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey as any);
    return () => window.removeEventListener('keydown', handleKey as any);
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Glow / background blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-fuchsia-500 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-sky-500 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
      </div>

      {/* Header */}
      <header className="z-10 w-full max-w-6xl flex justify-between items-center px-4 sm:px-8 mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
            T.Group • Gente e Cultura
          </span>
          <span className="text-sm text-slate-300">
            Plano 2026 • Slide {index + 1} de {total}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Setas ← → ou espaço para navegar</span>
        </div>
      </header>

      {/* Slide card */}
      <main className="z-10 w-full max-w-6xl px-4 sm:px-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.section
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="relative rounded-3xl border border-white/15 bg-white/8 bg-clip-padding backdrop-blur-2xl shadow-[0_0_80px_rgba(15,23,42,0.9)] px-6 sm:px-10 py-8 sm:py-10 overflow-hidden"
          >
            {/* subtle overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

            <div className="relative flex flex-col gap-4">
              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
                  {current.title}
                </h1>
                {current.subtitle && (
                  <p className="mt-1 text-sm sm:text-base text-slate-300">
                    {current.subtitle}
                  </p>
                )}
              </div>

              {/* Highlight text */}
              {current.highlight && (
                <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-100/90 border-l-2 border-fuchsia-400/80 pl-3">
                  {current.highlight}
                </p>
              )}

              {/* Bullets */}
              {current.bullets && (
                <ul className="mt-3 space-y-2 text-sm sm:text-base text-slate-100/90">
                  {current.bullets.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-fuchsia-400/90" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer */}
              {current.footer && (
                <p className="mt-4 text-xs sm:text-sm text-slate-400">
                  {current.footer}
                </p>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Controls + progress */}
      <footer className="z-10 mt-4 mb-6 w-full max-w-6xl px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-slate-50 disabled:opacity-40 disabled:cursor-default hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Anterior
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/80 px-3 py-1.5 text-xs sm:text-sm text-slate-50 disabled:opacity-40 disabled:cursor-default hover:bg-fuchsia-500 transition-colors"
          >
            Próximo
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? 'w-6 bg-fuchsia-400'
                  : 'w-2 bg-slate-500/50 hover:bg-slate-300/80'
              }`}
              aria-label={`Ir para o slide ${i + 1}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
