'use client';

import { useEffect, useState, ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type SlideVariant = 'default' | 'roadmap' | 'devices';
type SlideAccent = 'fuchsia' | 'sky' | 'emerald' | 'amber';

type RoadmapSection = {
  title: string;
  items: string[];
};

type DeviceMockup = {
  type: 'phone' | 'laptop';
  label: string;
  image: string; // caminho em /public, ex: /gc-assets/device-mobile-checkin.png
};

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  highlight?: string;
  footer?: string;
  accent?: SlideAccent;
  variant?: SlideVariant;
  roadmap?: RoadmapSection[];
  devices?: DeviceMockup[];
  highlightWords?: string[];
};

const accentConfig: Record<
  SlideAccent,
  {
    bulletDot: string;
    highlightBorder: string;
    highlightText: string;
    buttonPrimary: string;
    buttonBorder: string;
    titleGradient: string;
    haloBg: string;
  }
> = {
  fuchsia: {
    bulletDot: 'bg-fuchsia-400/90',
    highlightBorder: 'border-fuchsia-400/80',
    highlightText: 'text-fuchsia-300',
    buttonPrimary:
      'border-fuchsia-400/40 bg-fuchsia-500/80 hover:bg-fuchsia-500',
    buttonBorder: 'border-white/20',
    titleGradient: 'from-fuchsia-300 via-fuchsia-100 to-sky-300',
    haloBg: 'from-fuchsia-500/25 via-fuchsia-400/10 to-transparent'
  },
  sky: {
    bulletDot: 'bg-sky-400/90',
    highlightBorder: 'border-sky-400/80',
    highlightText: 'text-sky-300',
    buttonPrimary: 'border-sky-400/40 bg-sky-500/80 hover:bg-sky-500',
    buttonBorder: 'border-white/20',
    titleGradient: 'from-sky-300 via-sky-100 to-emerald-300',
    haloBg: 'from-sky-500/25 via-sky-400/10 to-transparent'
  },
  emerald: {
    bulletDot: 'bg-emerald-400/90',
    highlightBorder: 'border-emerald-400/80',
    highlightText: 'text-emerald-300',
    buttonPrimary:
      'border-emerald-400/40 bg-emerald-500/80 hover:bg-emerald-500',
    buttonBorder: 'border-white/20',
    titleGradient: 'from-emerald-300 via-emerald-100 to-sky-300',
    haloBg: 'from-emerald-500/25 via-emerald-400/10 to-transparent'
  },
  amber: {
    bulletDot: 'bg-amber-400/90',
    highlightBorder: 'border-amber-400/80',
    highlightText: 'text-amber-300',
    buttonPrimary: 'border-amber-400/40 bg-amber-500/80 hover:bg-amber-500',
    buttonBorder: 'border-white/20',
    titleGradient: 'from-amber-300 via-amber-100 to-fuchsia-300',
    haloBg: 'from-amber-500/25 via-amber-400/10 to-transparent'
  }
};

const defaultAccent: SlideAccent = 'fuchsia';

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.99
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.99
  })
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 }
};

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderHighlightedText(
  text: string,
  highlightWords: string[] | undefined,
  accent: SlideAccent
): ReactNode {
  if (!highlightWords || highlightWords.length === 0) return text;

  const regex = new RegExp(
    `(${highlightWords.map((w) => escapeRegExp(w)).join('|')})`,
    'gi'
  );
  const accentClass = accentConfig[accent].highlightText;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isHighlight = highlightWords.some((w) =>
      new RegExp(`^${escapeRegExp(w)}$`, 'i').test(part)
    );
    if (isHighlight) {
      return (
        <span key={i} className={`${accentClass} font-semibold`}>
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ========= SLIDES =========

const slides: Slide[] = [
  {
    id: 'capa',
    title: 'Gente e Cultura T.Group',
    subtitle: 'Análise do cenário atual e plano 2026',
    highlight:
      'De um exército de duas pessoas para um sistema sustentável de pessoas para toda a holding.',
    accent: 'fuchsia',
    highlightWords: ['sistema sustentável', 'holding', 'Gente e Cultura']
  },
  {
    id: 'contexto',
    title: '1. Apresentação e contexto',
    bullets: [
      'O T.Group é uma holding de entretenimento com vocações complementares.',
      'Empresas: T.Youth, T.Brands, T.Dreams, T.Venues e WAS.',
      'Essência: criar experiências relevantes para pessoas, marcas e públicos diversos.',
      'Base do negócio: times jovens, criativos e intensos, com entregas que precisam ser sustentáveis.'
    ],
    footer: 'É nesse cenário que Gente e Cultura se torna pilar estratégico para o grupo.',
    accent: 'sky',
    highlightWords: ['holding', 'experiências', 'sustentáveis']
  },
  {
    id: 'gc-hoje',
    title: '2. O que é Gente e Cultura hoje',
    bullets: [
      'Evolução do antigo RH para uma área de pessoas, cultura e experiência.',
      'Atende todas as empresas da holding como hub consultivo.',
      'Responsável por recrutamento, admissões, desligamentos, benefícios e interface com financeiro/contabilidade.',
      'Guardião da cultura, dos rituais internos e da “cara interna” do T.Group.',
      'Sponsor de Facilities e da gestão da sede, além de criar ferramentas digitais internas.'
    ],
    accent: 'emerald',
    highlightWords: ['hub consultivo', 'cultura', 'ferramentas digitais']
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
    ],
    accent: 'fuchsia',
    highlightWords: ['Recrutamento', 'onboarding', 'DP', 'Benefícios']
  },
  {
    id: 'rs',
    title: '3.1. Recrutamento e Seleção',
    bullets: [
      'Recebimento do pedido da liderança de qualquer empresa do grupo.',
      'Desenho e arte da vaga, estrutura de acompanhamento no Drive e publicação em canais.',
      'Triagem de currículos, contato com candidatos e organização das etapas (entrevistas, testes, cases).',
      'Aplicação de DISC e entrevistas focadas em alinhamento cultural e perfil profissional.',
      'Contato com aprovados, retorno para reprovados e fechamento do processo – tudo concentrado em GC.'
    ],
    accent: 'sky',
    highlightWords: ['liderança', 'DISC', 'alinhamento cultural']
  },
  {
    id: 'admissao',
    title: '3.2. Admissão e integração',
    subtitle: 'Onboarding ainda fragmentado',
    bullets: [
      'Envio de proposta, coleta de dados, atualização de planilhas e orientações para abertura de MEI.',
      'Suporte sobre emissão de notas fiscais e comunicação de benefícios (TotalPass, Petin, Capacitar).',
      'Criação de arte de boas-vindas, inclusão em grupos e criação de e-mail corporativo.',
      'Alinhamento com financeiro e contabilidade em datas de pagamento e cálculos proporcionais.',
      'Falta um fluxo único de onboarding com ritual mensal, vídeo institucional, dinâmicas e kit oficial.'
    ],
    accent: 'amber',
    highlightWords: ['onboarding', 'benefícios', 'ritual mensal', 'kit oficial']
  },
  {
    id: 'desligamentos',
    title: '3.3. Desligamentos',
    bullets: [
      'Condução da conversa de desligamento (preferencialmente presencial).',
      'Contato com contabilidade para extrato de rescisão (PJ e CLT) e assinatura de termos.',
      'Atualização de planilhas de colaboradores, comunicação de pagamentos ao financeiro e cancelamento de acessos.',
      'Ainda não há entrevistas de desligamento estruturadas com registros e indicadores consistentes.'
    ],
    accent: 'fuchsia',
    highlightWords: ['desligamento', 'rescisão', 'entrevistas de desligamento']
  },
  {
    id: 'dp',
    title: '3.4. DP, folha e rotinas burocráticas',
    bullets: [
      'Folha CLT terceirizada (NOU), mas grande parte de People Ops concentrada em GC.',
      'NF-Express criado internamente para upload de notas fiscais.',
      'Envio de comunicados, atualização de planilhas, cobrança de NFs em atraso e suporte a novos colaboradores.',
      'Relatórios de TotalPass e Google Workspace, controle de gastos e reembolsos.',
      'Na prática, uma estrutura de DP/People Ops operada por uma pessoa, com apoio do sócio Vinicius David.'
    ],
    accent: 'emerald',
    highlightWords: ['NOU', 'NF-Express', 'People Ops', 'TotalPass']
  },
  {
    id: 'consultivo',
    title: '3.5. Atendimento às empresas e papel consultivo',
    bullets: [
      'Orientação de líderes em temas de gestão de pessoas, conflitos e feedback.',
      'Análises de clima, escutas individuais e intervenções pontuais.',
      'Apoio na construção de planos de desenvolvimento de lideranças.',
      'Redesenho de funções e fluxos, como no caso de Facilities.',
      'GC atua como parceiro de negócio das empresas da holding.'
    ],
    accent: 'sky',
    highlightWords: ['clima', 'feedback', 'parceiro de negócio']
  },
  {
    id: 'cultura-rituais',
    title: '3.6. Cultura, rituais e experiência',
    bullets: [
      'Esportes T.Group (society e vôlei de areia) – organização de ponta a ponta.',
      'Café com T – contato com sócios, apresentação, café, comunicação e condução.',
      'Aniversariantes, Happy Hour, massagista e manicure como rituais de cuidado.',
      'Confraternização geral anual e apoio a confraternizações por empresa.',
      'Rituais essenciais de engajamento hoje operados de forma 100% manual por GC.'
    ],
    accent: 'amber',
    highlightWords: ['Esportes T.Group', 'Café com T', 'engajamento']
  },
  {
    id: 'facilities',
    title: '3.7. Facilities e gestão da casa',
    bullets: [
      'Mentoria para liderança de Facilities e apoio às rotinas de limpeza, organização e cozinha.',
      'Participação em decisões sobre reformas, melhorias e prioridades da sede.',
      'Responsabilidade pela relação com vizinhos e gestão de ruídos com clientes.',
      'Negociação e renovação de contratos com imobiliária, seguros e frentes ligadas à casa.',
      'GC se torna guardião da experiência física da sede, ampliando fortemente o escopo da área.'
    ],
    accent: 'emerald',
    highlightWords: ['Facilities', 'guardião', 'experiência física']
  },
  {
    id: 'ti-gente',
    title: '3.8. TI de gente e automações',
    subtitle: 'Check-in, NF-Express, HR Ops e mais',
    bullets: [
      'Criação e cancelamento de e-mails, gestão de permissões e Drives no Google Workspace.',
      'Configuração de domínios em Locaweb e GoDaddy (DNS, SPF, DKIM).',
      'Criação de soluções internas: Check-in de almoço, NF-Express, HR Ops, T.Facilities Hub/Rotas, dashboards em Looker Studio.',
      'Nível de automação raro para agências do porte do T.Group, concentrado em uma única pessoa.'
    ],
    accent: 'fuchsia',
    variant: 'devices',
    highlightWords: ['Check-in de almoço', 'NF-Express', 'HR Ops', 'dashboards'],
    devices: [
      {
        type: 'phone',
        label: 'Check-in do almoço • mobile',
        image: '/gc-assets/device-mobile-checkin.png'
      },
      {
        type: 'laptop',
        label: 'NF-Express & HR Ops • desktop',
        image: '/gc-assets/device-laptop-nfexpress.png'
      }
    ]
  },
  {
    id: 'beneficios',
    title: '3.9. Benefícios e proposta de valor',
    bullets: [
      'Benefícios atuais: TotalPass, Petin, Capacitar/Udemy, convênios educacionais.',
      'Estudo de benefícios flexíveis (iFood Benefícios, Caju) e de plano de saúde (Tailor).',
      'Avaliação de plataforma de performance e gestão de pessoas (Qulture.Rocks).',
      'O desafio é transformar tudo isso em uma proposta de valor clara, percebida e comunicada.'
    ],
    accent: 'amber',
    highlightWords: ['benefícios flexíveis', 'plano de saúde', 'proposta de valor']
  },
  {
    id: 'riscos-resumo',
    title: '4. Riscos do modelo atual',
    bullets: [
      'GC é estratégico e reconhecido, mas operado de forma artesanal.',
      'Dependência extrema de uma pessoa para operações críticas e conhecimento histórico.',
      'Sobrecarga aumenta risco de burnout, erros operacionais e passivos trabalhistas.',
      'Experiência do colaborador varia entre empresas e momentos.',
      'GC pode virar gargalo do crescimento da holding se nada mudar.'
    ],
    accent: 'fuchsia',
    highlightWords: ['artesanal', 'burnout', 'gargalo']
  },
  {
    id: 'principios',
    title: '5. Princípios norteadores 2026',
    bullets: [
      'GC como área estratégica, não apenas operacional.',
      'Divisão clara entre estratégia (Head) e operação (DP/People Ops).',
      'Experiência do colaborador unificada em toda a holding.',
      'Decisões orientadas por dados de gente (turnover, engajamento, performance, benefícios).',
      'Ferramentas jovens, digitais e acessíveis, alinhadas ao perfil do T.Group.',
      'Cuidado também com quem cuida – sustentabilidade do próprio time de GC.'
    ],
    accent: 'emerald',
    highlightWords: ['estratégica', 'dados de gente', 'sustentabilidade']
  },
  {
    id: 'objetivos',
    title: '6. Objetivos estratégicos de GC para 2026',
    bullets: [
      '1. Reestruturar GC, criando uma célula interna de DP/People Ops.',
      '2. Padronizar a jornada do colaborador (entrada, desenvolvimento e saída).',
      '3. Implantar ciclo de performance e desenvolvimento apoiado em plataforma.',
      '4. Fortalecer a proposta de valor ao colaborador (benefícios + cultura + rituais + reconhecimento).',
      '5. Digitalizar a comunicação de GC (HR Ops + intranet) e consolidar People Analytics.'
    ],
    accent: 'sky',
    highlightWords: ['DP/People Ops', 'jornada do colaborador', 'People Analytics']
  },
  {
    id: 'frente-estrutura',
    title: '7.1. Estrutura e time de GC',
    subtitle: 'Frente 1 – Estrutura e DP/People Ops',
    bullets: [
      'Organograma mínimo: Head de GC + Analista de DP/People Ops.',
      'Business case: custo atual de DP terceirizado + tempo de GC x cenário com DP mais internalizado.',
      'Ganhos esperados: menos erros, mais agilidade e mais tempo estratégico do Head.',
      'Cronograma: Q4 2025 desenho e validação, Q1 2026 contratação, Q2–Q3 transição, Q4 revisão do modelo.'
    ],
    accent: 'fuchsia',
    highlightWords: ['Analista de DP/People Ops', 'business case', 'cronograma']
  },
  {
    id: 'frente-onboarding',
    title: '7.2. Recrutamento, onboarding e jornada 0–90 dias',
    bullets: [
      'Playbook de recrutamento T.Group com etapas, SLAs e modelos de comunicação.',
      'Fluxo de R&S integrado ao HR Ops com visão em kanban por vaga.',
      'Jornada 0–90 dias com marcos em Dia 0, primeira semana, Dia 30, 60 e 90.',
      'Encontro de Boas-Vindas mensal da holding com café da manhã, vídeo e dinâmicas.',
      'Kit de boas-vindas oficial alinhado ao DNA do T.Group.'
    ],
    accent: 'emerald',
    highlightWords: [
      'Playbook',
      'Jornada 0–90 dias',
      'Encontro de Boas-Vindas',
      'kit de boas-vindas'
    ]
  },
  {
    id: 'frente-dp',
    title: '7.3. DP interno e People Ops',
    bullets: [
      'Mapear todos os processos de DP/People Ops, com passo a passo e donos definidos.',
      'Redesenhar responsabilidades entre Analista de DP, NOU, Financeiro e Head de GC.',
      'Conectar fluxos ao HR Ops para acompanhamento transparente de solicitações.',
      'Reduzir retrabalho e centralização em mensagens avulsas.'
    ],
    accent: 'sky',
    highlightWords: ['processos', 'responsabilidades', 'transparente']
  },
  {
    id: 'frente-performance',
    title: '7.4. Performance, PDI e desenvolvimento de lideranças',
    bullets: [
      'Definir modelo de avaliação com ciclo anual e checkpoints trimestrais.',
      'Estruturar PDI simples, com metas, ações, prazos e evidências.',
      'Avaliar implantação de plataforma como Qulture.Rocks para metas, feedbacks e 1:1.',
      'Oferecer capacitações para líderes em 1:1, feedback e uso de dados.'
    ],
    accent: 'amber',
    highlightWords: ['PDI', 'Qulture.Rocks', 'feedback']
  },
  {
    id: 'frente-cultura',
    title: '7.5. Cultura, rituais e reconhecimento',
    bullets: [
      'Construir calendário anual de GC com todos os rituais mapeados.',
      'Distribuir responsabilidades entre GC, Facilities e empresas.',
      'Criar programa de reconhecimento por tempo de casa (1, 3, 5, 7, 10 anos).',
      'Conectar presentes e rituais ao DNA do T.Group.'
    ],
    accent: 'emerald',
    highlightWords: ['calendário anual', 'reconhecimento', 'tempo de casa']
  },
  {
    id: 'frente-beneficios',
    title: '7.6. Benefícios e proposta de valor',
    bullets: [
      'Mapear e comunicar com clareza benefícios já existentes.',
      'Realizar pesquisa interna de benefícios para entender prioridades.',
      'Avaliar benefícios flexíveis (iFood, Caju), plano de saúde/odontológico (Tailor) e outros.',
      'Criar Manual de Benefícios T.Group na intranet, com linguagem simples e exemplos.'
    ],
    accent: 'amber',
    highlightWords: ['pesquisa interna', 'benefícios flexíveis', 'Manual de Benefícios']
  },
  {
    id: 'frente-facilities-ti',
    title: '7.7–7.9. Facilities, TI de gente e People Analytics',
    bullets: [
      'Finalizar e implantar a Bíblia de Facilities, com rotinas e checklists digitais.',
      'Evoluir HR Ops para porta oficial de entrada de demandas de GC.',
      'Desenvolver a intranet T.Group como “lar digital” de políticas, calendário e benefícios.',
      'Definir painel mínimo de indicadores de gente e consolidar em dashboard executivo (Looker Studio).'
    ],
    accent: 'fuchsia',
    highlightWords: ['Bíblia de Facilities', 'intranet', 'dashboard executivo']
  },
  {
    id: 'roadmap',
    title: '8. Roadmap 2026 – visão geral',
    variant: 'roadmap',
    accent: 'sky',
    roadmap: [
      {
        title: 'Q4 2025',
        items: [
          'Aprovação da visão e do plano de GC com os sócios.',
          'Desenho do organograma de GC e da vaga de DP/People Ops.',
          'Mapeamento de processos de DP/People Ops.',
          'Desenho da Jornada 0–90 dias e do Encontro de Boas-Vindas.',
          'Construção do calendário anual de GC.'
        ]
      },
      {
        title: 'Q1 2026',
        items: [
          'Recrutamento e contratação do Analista de DP/People Ops.',
          'Implementação do playbook de R&S.',
          'Primeiro Encontro de Boas-Vindas em prática.',
          'Início da construção da intranet (MVP).',
          'Pesquisa interna de benefícios.'
        ]
      },
      {
        title: 'Q2 2026',
        items: [
          'Analista de DP assumindo grande parte das rotinas operacionais.',
          'Implementação do ciclo de performance.',
          'Definição e possível implantação do novo pacote de benefícios.',
          'Intranet com seções de GC e Facilities no ar.'
        ]
      },
      {
        title: 'Q4 2026',
        items: [
          'Primeiro ciclo de performance concluído.',
          'Revisão do modelo de DP interno e ajustes.',
          'Consolidação do programa de reconhecimento por tempo de casa.',
          'Apresentação dos resultados de GC 2026 para os sócios.'
        ]
      }
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
      'Não é fazer mais coisas – é fazer do jeito certo, com estrutura, processos e ferramentas adequadas.',
      'Gente e Cultura se posiciona como área tecnológica, estratégica e protagonista do futuro do T.Group.'
    ],
    footer: '“Não é RH, é Gente e Cultura.”',
    accent: 'fuchsia',
    highlightWords: ['sistema de pessoas', 'dados e tecnologia', 'protagonista']
  }
];

// ========= COMPONENTE =========

export default function GC2026DeckPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;
  const current = slides[index];
  const accent = current.accent ?? defaultAccent;
  const accentCfg = accentConfig[accent];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const renderRoadmap = (sections: RoadmapSection[]) => (
    <div className="mt-6">
      <div className="mb-4 text-sm sm:text-base text-slate-300">
        Linha do tempo dos principais marcos de Gente e Cultura em 2026.
      </div>
      <div className="relative mt-4">
        <div className="absolute inset-x-6 top-1/2 h-px bg-slate-500/40 sm:inset-x-10" />
        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="relative flex flex-col gap-2 rounded-2xl bg-slate-950/60 border border-white/15 px-4 py-4 backdrop-blur-xl"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`h-3 w-3 rounded-full shadow-[0_0_16px_rgba(248,250,252,0.95)] ${accentCfg.bulletDot}`}
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                {section.title}
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200/90">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className={`mt-1 h-1 w-1 rounded-full ${accentCfg.bulletDot}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevices = (devices: DeviceMockup[]) => (
    <div className="flex justify-center gap-4 sm:gap-6">
      {devices.map((device) => {
        const isPhone = device.type === 'phone';
        return (
          <div
            key={device.label}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`relative ${
                isPhone
                  ? 'h-48 w-24 sm:h-56 sm:w-28 md:h-64 md:w-32'
                  : 'h-40 w-56 sm:h-48 sm:w-64 md:h-56 md:w-80'
              } rounded-[32px] border border-white/25 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-2xl overflow-hidden`}
            >
              {isPhone && (
                <div className="absolute inset-x-6 top-0 h-4 rounded-b-3xl bg-slate-900/80" />
              )}
              <Image
                src={device.image}
                alt={device.label}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, 100vw"
              />
            </div>
            <span className="text-xs sm:text-sm text-slate-300 text-center">
              {device.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const renderOnboardingTimeline = () => {
    const steps = [
      {
        tag: 'Dia 0',
        title: 'Chegada + Boas-vindas',
        desc: 'Apresentação, tour pela casa, kit de boas-vindas e alinhamento com a liderança.'
      },
      {
        tag: 'Semana 1',
        title: 'Imersão no time',
        desc: 'Rotina acompanhada, acesso às ferramentas e apresentação dos projetos em andamento.'
      },
      {
        tag: 'Dia 30',
        title: 'Primeiro checkpoint',
        desc: 'Feedback estruturado, expectativas ajustadas e pequenos ajustes de rota.'
      },
      {
        tag: 'Dia 60',
        title: 'Consolidação',
        desc: 'Autonomia maior, conexão com outras áreas e participação em rituais importantes.'
      },
      {
        tag: 'Dia 90',
        title: 'Validação',
        desc: 'Fechamento da jornada inicial, alinhamento de PDI e metas para o próximo ciclo.'
      }
    ];

    return (
      <div className="mt-6">
        <p className="text-sm sm:text-base text-slate-300 mb-4">
          Jornada pensada para garantir que ninguém “se vire sozinho” nos primeiros meses de T.Group.
        </p>
        <div className="relative mt-4">
          <div className="absolute inset-x-8 top-1/2 hidden h-px bg-slate-600/40 lg:block" />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.tag}
                className="relative flex flex-col gap-2 rounded-2xl bg-slate-950/70 border border-white/15 px-4 py-4 backdrop-blur-xl"
              >
                <div
                  className={`inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold text-slate-900 bg-white`}
                >
                  {step.tag}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSlideContent = (slide: Slide) => {
    const variant = slide.variant ?? 'default';

    // ROADMAP
    if (variant === 'roadmap' && slide.roadmap) {
      return (
        <div className="relative flex flex-col gap-4">
          <div>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${accentCfg.titleGradient}`}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-2 text-base sm:text-lg text-slate-200">
                {slide.subtitle}
              </p>
            )}
          </div>
          {renderRoadmap(slide.roadmap)}
        </div>
      );
    }

    // DEVICES
    if (variant === 'devices' && slide.devices) {
      return (
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] items-center">
          <div className="flex flex-col gap-4">
            <div>
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${accentCfg.titleGradient}`}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="mt-2 text-base sm:text-lg text-slate-200">
                  {slide.subtitle}
                </p>
              )}
            </div>
            {slide.highlight && (
              <p
                className={`mt-2 text-base sm:text-lg text-slate-100/90 border-l-2 pl-3 ${accentCfg.highlightBorder}`}
              >
                {renderHighlightedText(
                  slide.highlight,
                  slide.highlightWords,
                  accent
                )}
              </p>
            )}
            {slide.bullets && (
              <motion.ul
                className="mt-2 space-y-2 text-base sm:text-lg text-slate-100/90"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {slide.bullets.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex gap-3"
                  >
                    <span
                      className={`mt-[7px] h-1.5 w-1.5 rounded-full ${accentCfg.bulletDot}`}
                    />
                    <span>
                      {renderHighlightedText(item, slide.highlightWords, accent)}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
            {slide.footer && (
              <p className="mt-4 text-xs sm:text-sm text-slate-400">
                {slide.footer}
              </p>
            )}
          </div>
          <div className="flex justify-center lg:justify-end">
            {renderDevices(slide.devices)}
          </div>
        </div>
      );
    }

    // SLIDE ESPECIAL: 0–90 DIAS
    if (slide.id === 'frente-onboarding') {
      return (
        <div className="relative flex flex-col gap-4">
          <div>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${accentCfg.titleGradient}`}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="mt-2 text-base sm:text-lg text-slate-200">
                {slide.subtitle}
              </p>
            )}
          </div>

          {slide.bullets && (
            <motion.ul
              className="mt-2 space-y-2 text-base sm:text-lg text-slate-100/90"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {slide.bullets.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex gap-3"
                >
                  <span
                    className={`mt-[7px] h-1.5 w-1.5 rounded-full ${accentCfg.bulletDot}`}
                  />
                  <span>
                    {renderHighlightedText(item, slide.highlightWords, accent)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {renderOnboardingTimeline()}
        </div>
      );
    }

    // DEFAULT
    return (
      <div className="relative flex flex-col gap-4">
        <div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${accentCfg.titleGradient}`}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-2 text-base sm:text-lg text-slate-200">
              {slide.subtitle}
            </p>
          )}
        </div>

        {slide.highlight && (
          <p
            className={`mt-2 text-base sm:text-lg text-slate-100/90 border-l-2 pl-3 ${accentCfg.highlightBorder}`}
          >
            {renderHighlightedText(slide.highlight, slide.highlightWords, accent)}
          </p>
        )}

        {slide.bullets && (
          <motion.ul
            className="mt-2 space-y-2 text-base sm:text-lg text-slate-100/90"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {slide.bullets.map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex gap-3"
              >
                <span
                  className={`mt-[7px] h-1.5 w-1.5 rounded-full ${accentCfg.bulletDot}`}
                />
                <span>
                  {renderHighlightedText(item, slide.highlightWords, accent)}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {slide.footer && (
          <p className="mt-4 text-xs sm:text-sm text-slate-400">
            {slide.footer}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex flex-col relative overflow-hidden">
      {/* blobs gerais */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-fuchsia-500 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-sky-500 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
      </motion.div>

      {/* header fixo */}
      <header className="z-10 w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
            T.Group • Gente e Cultura
          </span>
          <span className="text-sm sm:text-base text-slate-300">
            Plano 2026 • Slide {index + 1} de {total}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <span>Setas ← → ou espaço para navegar</span>
        </div>
      </header>

      {/* halo do slide atual */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-24 h-72 blur-3xl bg-gradient-to-b ${accentCfg.haloBg}`}
      />

      {/* conteúdo do slide */}
      <main className="z-10 flex-1 flex items-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.section
            key={current.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 md:py-14"
          >
            {renderSlideContent(current)}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* footer / navegação */}
      <footer className="z-10 pb-6 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs sm:text-sm md:text-base text-slate-50 disabled:opacity-40 disabled:cursor-default hover:bg-white/15 transition-colors ${accentCfg.buttonBorder} bg-white/5`}
          >
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
            Anterior
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs sm:text-sm md:text-base text-slate-50 disabled:opacity-40 disabled:cursor-default transition-colors ${accentCfg.buttonPrimary}`}
          >
            Próximo
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? `w-6 ${accentCfg.bulletDot}`
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
