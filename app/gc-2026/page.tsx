'use client';

import { useEffect, useState, ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type SlideVariant = 'default' | 'roadmap' | 'devices' | 'cards';
type SlideAccent = 'fuchsia' | 'sky' | 'emerald' | 'amber';

type RoadmapSection = {
  title: string;
  items: string[];
};

type DeviceMockup = {
  type: 'phone' | 'laptop';
  label: string;
  image: string;
};

type CompanyLogo = {
  name: string;
  src: string;
};

type PillSection = {
  title: string;
  description: string;
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
  companyLogos?: CompanyLogo[];
  pillSections?: PillSection[];
  cards?: PillSection[];
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
      'De um exército de uma só pessoa para um sistema sustentável de pessoas para toda a holding.',
    accent: 'fuchsia',
    highlightWords: ['sistema sustentável', 'holding', 'Gente e Cultura']
  },
  {
    id: 'contexto',
    title: '1. Apresentação e contexto',
    bullets: [
      'O T.Group é uma holding de entretenimento com vocações complementares.',
      'Essência: criar experiências relevantes para pessoas, marcas e públicos diversos.',
      'Base do negócio: times jovens, criativos e intensos, com entregas que precisam ser sustentáveis.'
    ],
    footer:
      'É nesse cenário que Gente e Cultura se torna pilar estratégico para o grupo.',
    accent: 'sky',
    highlightWords: ['holding', 'experiências', 'sustentáveis'],
    companyLogos: [
      { name: 'T.Youth', src: '/gc-assets/logo-tyouth.png' },
      { name: 'T.Brands', src: '/gc-assets/logo-tbrands.png' },
      { name: 'T.Dreams', src: '/gc-assets/logo-tdreams.png' },
      { name: 'T.Venues', src: '/gc-assets/logo-tvenues.png' },
      { name: 'WAS', src: '/gc-assets/logo-was.png' }
    ]
  },
  {
    id: 'gc-hoje',
    title: '2. O que é Gente e Cultura hoje',
    bullets: [
      'Evolução do antigo RH para uma área de pessoas, cultura e experiência.',
      'Atende todas as empresas da holding como hub consultivo.',
      'Responsável por recrutamento, admissões, desligamentos, benefícios e interface com financeiro/contabilidade.',
      'Guardião da cultura, dos rituais internos e da “cara interna” do T.Group.',
      'Sponsor de Facilities, gestão da sede e criação de soluções digitais internas.'
    ],
    accent: 'emerald',
    highlightWords: ['hub consultivo', 'cultura', 'soluções digitais']
  },
  {
    id: 'escopo-geral',
    title: '3. Escopo real de Gente e Cultura',
    subtitle: 'Visão geral em 9 frentes',
    accent: 'fuchsia',
    pillSections: [
      {
        title: 'Recrutamento & Seleção',
        description:
          'Do pedido da liderança à aprovação: vagas, triagem, entrevistas, testes e feedbacks.'
      },
      {
        title: 'Onboarding & Integração',
        description:
          'Admissão, documentação, benefícios, boas-vindas e primeiras conexões com o time e a casa.'
      },
      {
        title: 'Desligamentos & Offboarding',
        description:
          'Condução de conversas, documentação, acertos e encerramento respeitoso da jornada.'
      },
      {
        title: 'DP & Rotinas PJ',
        description:
          'Folha CLT (via NOU), NF-Express, checagens, relatórios e relação com financeiro/contabilidade.'
      },
      {
        title: 'Atendimento às empresas',
        description:
          'Parceiro de negócio das empresas para temas de gestão de pessoas, conflitos e desenvolvimento.'
      },
      {
        title: 'Cultura & Experiência',
        description:
          'Rituais mensais (Café com T, Happy Hour, Esportes, etc.) e cuidado com a experiência do colaborador.'
      },
      {
        title: 'Facilities & Casa',
        description:
          'Mentoria, priorização de melhorias, relação com vizinhos, contratos e manutenção da sede.'
      },
      {
        title: 'TI de Gente',
        description:
          'Gestão de Google Workspace, domínios e criação de ferramentas internas (Check-in, HR Ops, dashboards).'
      },
      {
        title: 'Benefícios & Valor',
        description:
          'Curadoria e comunicação de benefícios que reforçam a proposta de valor do T.Group.'
      }
    ]
  },
  // 3.1 em CARDS
  {
    id: 'rs',
    title: '3.1. Recrutamento e Seleção',
    accent: 'sky',
    variant: 'cards',
    cards: [
      {
        title: 'Pedido da liderança',
        description:
          'Recebimento do pedido da liderança de qualquer empresa do grupo, entendendo urgência, perfil e contexto da vaga.'
      },
      {
        title: 'Desenho e divulgação da vaga',
        description:
          'Desenho e arte da vaga, criação da estrutura de acompanhamento no Drive e publicação em canais (LinkedIn, redes e rede de contatos).'
      },
      {
        title: 'Triagem e organização do funil',
        description:
          'Triagem de currículos, contato com candidatos e organização das etapas: entrevistas, testes técnicos e cases quando necessário.'
      },
      {
        title: 'DISC + alinhamento cultural',
        description:
          'Aplicação de DISC e entrevistas guiadas por alinhamento cultural, fit com o time e avaliação do histórico profissional.'
      },
      {
        title: 'Fechamento e feedbacks',
        description:
          'Contato com aprovados, retorno estruturado para reprovados e fechamento completo do processo – tudo concentrado em GC.'
      }
    ],
    highlightWords: ['DISC', 'alinhamento cultural']
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
  // 3.3 em CARDS
  {
    id: 'desligamentos',
    title: '3.3. Desligamentos',
    accent: 'fuchsia',
    variant: 'cards',
    cards: [
      {
        title: 'Conversa de desligamento',
        description:
          'Condução da conversa de desligamento, preferencialmente presencial, com cuidado na comunicação e respeito à história da pessoa.'
      },
      {
        title: 'Documentação e cálculos',
        description:
          'Contato com a contabilidade para emissão do extrato de rescisão (PJ e CLT), além da conferência de valores e direitos.'
      },
      {
        title: 'Atualização de cadastros',
        description:
          'Atualização de planilhas de colaboradores, registros internos e controles de folha para garantir que nada fique para trás.'
      },
      {
        title: 'Pagamentos e acessos',
        description:
          'Comunicação ao financeiro sobre pagamentos pendentes, coordenação de prazos e cancelamento de acessos e e-mails corporativos.'
      },
      {
        title: 'Aprendizado perdido',
        description:
          'Ainda não há entrevistas de desligamento estruturadas com registros e indicadores consistentes – o aprendizado da saída se perde.'
      }
    ],
    highlightWords: ['desligamento', 'rescisão', 'entrevistas de desligamento']
  },
  // 3.4 em CARDS
  {
    id: 'dp',
    title: '3.4. DP, folha e rotinas burocráticas',
    accent: 'emerald',
    variant: 'cards',
    cards: [
      {
        title: 'Folha CLT via NOU',
        description:
          'Folha CLT terceirizada com a NOU, responsável pelos cálculos legais, obrigações acessórias e segurança jurídica básica.'
      },
      {
        title: 'NF-Express e notas fiscais',
        description:
          'NF-Express criado internamente por GC para upload de notas fiscais, centralizando dados e reduzindo erros de digitação.'
      },
      {
        title: 'Rotina mensal com financeiro',
        description:
          'Envio de comunicados, atualização de planilhas, cobrança de NFs em atraso, alinhamentos com financeiro e suporte individual a novos colaboradores.'
      },
      {
        title: 'Relatórios e controles',
        description:
          'Relatórios de TotalPass e Google Workspace, além do controle de gastos, reembolsos e indicadores que alimentam os sócios.'
      },
      {
        title: 'People Ops concentrado',
        description:
          'Na prática, uma estrutura de DP/People Ops operada por uma pessoa, com apoio do sócio Vinicius David – o que aumenta riscos e limita a escalabilidade.'
      }
    ],
    highlightWords: ['NOU', 'NF-Express', 'People Ops', 'TotalPass']
  },
  // 3.5 em CARDS
  {
    id: 'consultivo',
    title: '3.5. Atendimento às empresas e papel consultivo',
    accent: 'sky',
    variant: 'cards',
    cards: [
      {
        title: 'Apoio às lideranças',
        description:
          'Orientação de líderes em temas de gestão de pessoas, feedback, conflitos, reorganização de times e decisões sensíveis.'
      },
      {
        title: 'Escuta e clima',
        description:
          'Análises de clima, escutas individuais, conversas difíceis e intervenções pontuais para evitar que problemas cresçam.'
      },
      {
        title: 'Desenvolvimento de lideranças',
        description:
          'Apoio na construção de planos de desenvolvimento de lideranças, com conteúdos, reflexões e exercícios práticos.'
      },
      {
        title: 'Redesenho de áreas',
        description:
          'Redesenho de funções e fluxos, como no caso de Facilities, unindo visão de negócio, experiência do colaborador e operação.'
      },
      {
        title: 'Parceiro de negócio',
        description:
          'GC atua como parceiro de negócio das empresas da holding, ajudando a tomar decisões melhores sobre gente considerando contexto e estratégia.'
      }
    ],
    highlightWords: ['clima', 'feedback', 'parceiro de negócio']
  },
  // 3.6 em CARDS
  {
    id: 'cultura-rituais',
    title: '3.6. Cultura, rituais e experiência',
    accent: 'amber',
    variant: 'cards',
    cards: [
      {
        title: 'Esportes T.Group',
        description:
          'Organização mensal de society e vôlei de areia: orçamentos, reservas de quadra, comunicação, logística e pós-evento.'
      },
      {
        title: 'Café com T',
        description:
          'Contato com sócios, construção da apresentação, contratação do café, montagem do espaço, comunicação geral e condução do encontro.'
      },
      {
        title: 'Rituais de cuidado',
        description:
          'Aniversariantes, Happy Hour, massagista e manicure como rituais recorrentes de cuidado e conexão entre as pessoas.'
      },
      {
        title: 'Confraternizações',
        description:
          'Confraternização geral anual e apoio a confraternizações específicas por empresa (como WAS, T.Youth, etc.).'
      },
      {
        title: 'Operação 100% manual',
        description:
          'Rituais essenciais de engajamento hoje são operados de forma 100% manual por GC, com pouco suporte operacional dedicado.'
      }
    ],
    highlightWords: ['Esportes T.Group', 'Café com T', 'engajamento']
  },
  // 3.7 em CARDS
  {
    id: 'facilities',
    title: '3.7. Facilities e gestão da casa',
    accent: 'emerald',
    variant: 'cards',
    cards: [
      {
        title: 'Mentoria de Facilities',
        description:
          'Mentoria direta para a liderança de Facilities e apoio ao time nas rotinas de limpeza, organização, cozinha e atendimento interno.'
      },
      {
        title: 'Prioridades da sede',
        description:
          'Participação ativa em decisões sobre reformas, melhorias, compras estruturais e prioridades de investimento na casa.'
      },
      {
        title: 'Relação com vizinhança',
        description:
          'Responsabilidade pela relação com vizinhos e gestão de ruídos envolvendo eventos, clientes e entregas.'
      },
      {
        title: 'Contratos e seguros',
        description:
          'Negociação e renovação de contratos com imobiliária, seguros e frentes ligadas ao imóvel da sede.'
      },
      {
        title: 'Experiência física da casa',
        description:
          'GC se torna guardião da experiência física da sede, alinhando a casa ao mesmo nível de cuidado da experiência digital e de eventos.'
      }
    ],
    highlightWords: ['Facilities', 'guardião', 'experiência física']
  },
  // 3.8 (parte 1) – DEVICES
  {
      {
    id: 'ti-gente',
    title: '3.8. TI de gente e automações',
    subtitle: 'Dashboard financeiro, HR Ops e fluxos do dia a dia',
    bullets: [
      'Criação e cancelamento de e-mails, gestão de permissões e Drives no Google Workspace.',
      'Configuração de domínios em Locaweb e GoDaddy (DNS, SPF, DKIM).',
      'Criação de soluções internas: Check-in de almoço, NF-Express, HR Ops, T.Facilities Hub/Rotas e dashboards em Looker Studio.',
      'Nível de automação raro para agências do porte do T.Group, concentrado em uma única pessoa.'
    ],
    accent: 'fuchsia',
    variant: 'devices',
    highlightWords: [
      'Check-in de almoço',
      'NF-Express',
      'HR Ops',
      'T.Facilities Hub',
      'dashboards'
    ],
    devices: [
      {
        type: 'phone',
        label: 'Check-in do almoço • mobile',
        image: '/gc-assets/mock-checkin-almoco.png'
      },
      {
        type: 'phone',
        label: 'T.Facilities Hub • mobile',
        image: '/gc-assets/mock-tfacilities-hub.png'
      },
      {
        type: 'laptop',
        label: 'Dashboard financeiro • desktop',
        image: '/gc-assets/mock-dashboard-financeiro.png'
      },
      {
        type: 'laptop',
        label: 'HR Ops • desktop',
        image: '/gc-assets/mock-hr-ops.png'
      },
      {
        type: 'laptop',
        label: 'NF-Express • desktop',
        image: '/gc-assets/mock-nf-express.png'
      }
    ]
  },
  // 3.8 (parte 2) – CAMADAS
  {
    id: 'ti-gente-camadas',
    title: '3.8. TI de gente e automações (camadas)',
    subtitle: 'Da infraestrutura aos dados de pessoas',
    accent: 'fuchsia',
    variant: 'cards',
    cards: [
      {
        title: 'Camada 1 • Infraestrutura',
        description:
          'Google Workspace, domínios, DNS, SPF e DKIM garantindo que e-mails, acessos e segurança mínima funcionem para toda a holding.'
      },
      {
        title: 'Camada 2 • Ferramentas internas',
        description:
          'Check-in de almoço, NF-Express, HR Ops, T.Facilities Hub/Rotas e outros fluxos criados sob medida para o jeito T.Group de trabalhar.'
      },
      {
        title: 'Camada 3 • Dados e dashboards',
        description:
          'Integração com planilhas e painéis em Looker Studio, traduzindo rotinas em indicadores de gente, custos e operação.'
      },
      {
        title: 'Camada 4 • Experiência do colaborador',
        description:
          'Portas únicas de entrada (HR Ops, intranet) para que o colaborador peça o que precisa sem depender de mensagens soltas no WhatsApp ou e-mail.'
      }
    ],
    highlightWords: ['Infraestrutura', 'Ferramentas internas', 'Dados e dashboards']
  },
  // 3.9 em CARDS
  {
    id: 'beneficios',
    title: '3.9. Benefícios e proposta de valor',
    accent: 'amber',
    variant: 'cards',
    cards: [
      {
        title: 'Pacote atual',
        description:
          'Benefícios hoje: TotalPass, Petin, Capacitar/Udemy e convênios educacionais que apoiam bem-estar físico, emocional e desenvolvimento.'
      },
      {
        title: 'Benefícios flexíveis',
        description:
          'Estudo de benefícios flexíveis como iFood Benefícios e Caju, permitindo personalização de acordo com o momento de vida de cada pessoa.'
      },
      {
        title: 'Saúde e performance',
        description:
          'Avaliação de plano de saúde/odontológico via Tailor e de plataforma de performance e gestão de pessoas (como Qulture.Rocks).'
      },
      {
        title: 'História coerente',
        description:
          'O desafio é organizar tudo isso em uma narrativa clara de proposta de valor ao colaborador: o que o T.Group entrega, por quê e para quem.'
      }
    ],
    highlightWords: ['benefícios flexíveis', 'plano de saúde', 'proposta de valor']
  },
  {
    id: 'riscos-resumo',
    title: '4. Riscos do modelo atual',
    accent: 'fuchsia',
    variant: 'cards',
    cards: [
      {
        title: 'Operação artesanal',
        description:
          'GC é estratégico e reconhecido, mas muitas rotinas ainda são operadas de forma artesanal, com pouca padronização e dependência de memória.'
      },
      {
        title: 'Dependência de uma pessoa',
        description:
          'Concentração de conhecimento histórico, processos e ferramentas em uma única pessoa, aumentando o risco de descontinuidade.'
      },
      {
        title: 'Sobrecarga e burnout',
        description:
          'Sobrecarga diária aumenta risco de burnout, erros operacionais e, em casos extremos, eventuais passivos trabalhistas.'
      },
      {
        title: 'Experiências diferentes',
        description:
          'Experiência do colaborador varia entre empresas e momentos, sem um padrão claro de jornada T.Group.'
      },
      {
        title: 'Gargalo de crescimento',
        description:
          'Sem ajustes, GC pode virar gargalo do crescimento da holding, atrasando decisões e travando iniciativas-chave.'
      }
    ],
    highlightWords: ['artesanal', 'burnout', 'gargalo']
  },
  {
    id: 'principios',
    title: '5. Princípios norteadores 2026',
    accent: 'emerald',
    variant: 'cards',
    cards: [
      {
        title: 'GC estratégico',
        description:
          'Gente e Cultura como área estratégica, não apenas operacional – influenciando decisões de negócio com visão de pessoas.'
      },
      {
        title: 'Estratégia x operação',
        description:
          'Divisão clara entre a atuação estratégica do Head e a execução diária com apoio de DP/People Ops.'
      },
      {
        title: 'Jornada unificada',
        description:
          'Experiência do colaborador coerente em toda a holding, independente da empresa de origem.'
      },
      {
        title: 'Decisões orientadas por dados',
        description:
          'Uso de dados de gente (turnover, engajamento, performance, benefícios) para priorizar ações e investimentos.'
      },
      {
        title: 'Ferramentas jovens e digitais',
        description:
          'Ferramentas simples, digitais e acessíveis, alinhadas ao perfil jovem e criativo do T.Group.'
      },
      {
        title: 'Cuidar de quem cuida',
        description:
          'Cuidado com a sustentabilidade do próprio time de GC, evitando sobrecarga e garantindo continuidade do trabalho.'
      }
    ],
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

// ========= HELPERS VISUAIS =========

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
              <div className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold text-slate-900 bg-white">
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

const renderCardsGrid = (items: PillSection[], accent: SlideAccent) => {
  const accentCfg = accentConfig[accent];
  return (
    <div className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((pill) => (
          <div
            key={pill.title}
            className="rounded-2xl bg-slate-950/70 border border-white/15 px-4 py-4 backdrop-blur-xl flex flex-col gap-2"
          >
            <div className="inline-flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${accentCfg.bulletDot}`}
              />
              <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                {pill.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-200/90">
              {pill.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========= COMPONENTES VISUAIS ESPECIAIS =========

const renderOrgChart = (accent: SlideAccent) => {
  const accentCfg = accentConfig[accent];
  const levels = [
    {
      label: 'Sócios',
      description:
        'Definem a visão do T.Group e aprovam o plano de Gente e Cultura para a holding.'
    },
    {
      label: 'Head de Gente e Cultura',
      description:
        'Traduz a estratégia dos sócios em políticas, fluxos e projetos de pessoas.'
    },
    {
      label: 'Analista de DP/People Ops',
      description:
        'Garante a operação diária de folha, admissões, desligamentos e suporte às áreas.'
    }
  ];

  return (
    <motion.div
      className="rounded-3xl bg-slate-950/75 border border-white/15 px-4 py-5 sm:px-6 sm:py-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <p className="text-xs sm:text-sm text-slate-300 mb-4">
        Organização mínima proposta para GC, partindo dos sócios e chegando à operação de DP/People Ops.
      </p>
      <div className="relative flex flex-col items-stretch gap-4">
        <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 -translate-x-1/2 w-px bg-slate-700/60" />
        {levels.map((level, idx) => (
          <motion.div
            key={level.label}
            className="relative mx-auto flex w-full max-w-xs flex-col items-center gap-1 rounded-2xl bg-slate-900/80 border border-white/20 px-4 py-3 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * idx, duration: 0.35, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center justify-center rounded-full bg-slate-950/80 border border-white/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {idx === 0
                ? 'NÍVEL ESTRATÉGICO'
                : idx === levels.length - 1
                ? 'NÍVEL OPERACIONAL'
                : 'NÍVEL TÁTICO'}
            </div>
            <div className="mt-1 text-sm sm:text-base font-semibold text-slate-50">
              {level.label}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {level.description}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-[10px] sm:text-xs text-slate-400">
        * Este desenho é o ponto de partida para reduzir dependência de uma pessoa só e criar sustentabilidade de GC.
      </div>
    </motion.div>
  );
};

const renderPerformanceDashboard = (accent: SlideAccent) => {
  const accentCfg = accentConfig[accent];

  return (
    <motion.div
      className="rounded-3xl bg-slate-950/75 border border-white/15 px-4 py-5 sm:px-6 sm:py-6 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.9)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Painel desejado • Exemplo
          </p>
          <p className="text-sm sm:text-base text-slate-50">
            Performance, PDI e desenvolvimento
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs">
          <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-slate-200">
            2025
          </span>
          <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-400">
            2026 plano
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-900/80 border border-white/15 px-3 py-3 flex flex-col gap-1">
          <span className="text-[11px] sm:text-xs text-slate-300">
            Engajamento geral
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-semibold text-slate-50">
              84%
            </span>
            <span className="text-[11px] text-emerald-300">
              +4pp vs meta
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full w-[84%] rounded-full ${accentCfg.bulletDot}`}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-white/15 px-3 py-3 flex flex-col gap-1">
          <span className="text-[11px] sm:text-xs text-slate-300">
            PDIs ativos
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-semibold text-slate-50">
              32
            </span>
            <span className="text-[11px] text-slate-400">
              pessoas em acompanhamento
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full w-[72%] rounded-full ${accentCfg.bulletDot}`}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-white/15 px-3 py-3 flex flex-col gap-1">
          <span className="text-[11px] sm:text-xs text-slate-300">
            Feedbacks 1:1 registrados
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-semibold text-slate-50">
              74
            </span>
            <span className="text-[11px] text-slate-400">
              no último trimestre
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full w-[60%] rounded-full ${accentCfg.bulletDot}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-2xl bg-slate-900/80 border border-white/15 px-3 py-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300">
            <span>Checkpoint trimestral</span>
            <span>Q1 • Q2 • Q3 • Q4</span>
          </div>
          <div className="mt-3 flex h-24 gap-1">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => (
              <div
                key={q}
                className="flex-1 flex flex-col justify-end gap-1 text-center"
              >
                <div className="flex-1 rounded-t-md bg-slate-800/80 overflow-hidden flex items-end justify-center">
                  <div
                    className={`w-3 rounded-t-md ${accentCfg.bulletDot}`}
                    style={{ height: `${50 + 10 * idx}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400">
                  {q}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-white/15 px-3 py-3 flex flex-col gap-2">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-200">
            Foco do painel
          </span>
          <ul className="space-y-1 text-[11px] sm:text-xs text-slate-300">
            <li>• Quem já tem PDI estruturado e quem ainda não tem.</li>
            <li>• Lideranças com poucos feedbacks no trimestre.</li>
            <li>• Times com engajamento abaixo da meta.</li>
            <li>• Evolução das metas definidas no início do ciclo.</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-[10px] sm:text-xs text-slate-400">
        Visual ilustrativo: mostra como os dados gerados pelo ciclo de
        performance e PDI podem virar leitura rápida para sócios e
        lideranças.
      </p>
    </motion.div>
  );
};

const renderRecognitionTimeline = () => {
  const milestones = [
    {
      tag: '1 ano',
      title: 'Primeiro ciclo fechado',
      description:
        'Carta de agradecimento + presente simbólico conectado ao universo T.Group.'
    },
    {
      tag: '3 anos',
      title: 'Raiz formada',
      description:
        'Presente de experiência (vivência/ingressos) + destaque nos rituais de GC.'
    },
    {
      tag: '5 anos',
      title: 'Guardião da cultura',
      description:
        'Presente de maior valor, agradecimento público e momento de fala na confraternização.'
    },
    {
      tag: '7 anos',
      title: 'História viva',
      description:
        'Reconhecimento especial com narrativa da jornada e registro audiovisual.'
    },
    {
      tag: '10 anos',
      title: 'Tempo de casa lendário',
      description:
        'Celebração feita pelos sócios + presente marcante que simbolize a trajetória com o T.Group.'
    }
  ];

  return (
    <div className="mt-6">
      <p className="mb-3 text-xs sm:text-sm text-slate-300">
        Exemplo de trilha de reconhecimento por tempo de casa que nasce a
        partir deste plano.
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {milestones.map((m, idx) => (
          <motion.div
            key={m.tag}
            className="min-w-[140px] rounded-2xl bg-slate-950/75 border border-white/15 px-3 py-3 flex flex-col gap-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * idx, duration: 0.35, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center rounded-full bg-white text-slate-900 px-2 py-0.5 text-[10px] font-semibold">
              {m.tag}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-50 mt-1">
              {m.title}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300">
              {m.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ========= COMPONENTE PRINCIPAL =========

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
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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

  const renderCompanyLogos = (logos: CompanyLogo[]) => (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center justify-center rounded-2xl bg-slate-950/60 border border-white/10 px-4 py-2 backdrop-blur-xl"
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={80}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );

  const renderSlideContent = (slide: Slide) => {
    const variant = slide.variant ?? 'default';

    // Slide especial – Estrutura (organograma)
    if (slide.id === 'frente-estrutura') {
      return (
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
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
                      {renderHighlightedText(
                        item,
                        slide.highlightWords,
                        accent
                      )}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          {renderOrgChart(accent)}
        </div>
      );
    }

    // Slide especial – Performance (dashboard fake)
    if (slide.id === 'frente-performance') {
      return (
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.15fr)] items-start">
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
                      {renderHighlightedText(
                        item,
                        slide.highlightWords,
                        accent
                      )}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          {renderPerformanceDashboard(accent)}
        </div>
      );
    }

    // Slide especial – Cultura & Reconhecimento (timeline)
    if (slide.id === 'frente-cultura') {
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
                    {renderHighlightedText(
                      item,
                      slide.highlightWords,
                      accent
                    )}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {renderRecognitionTimeline()}
        </div>
      );
    }

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
                      {renderHighlightedText(
                        item,
                        slide.highlightWords,
                        accent
                      )}
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

    // CARDS (vários 3.x, 4, 5, 3.8 camadas, etc.)
    if (variant === 'cards' && slide.cards) {
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
              {renderHighlightedText(
                slide.highlight,
                slide.highlightWords,
                accent
              )}
            </p>
          )}

          {renderCardsGrid(slide.cards, accent)}

          {slide.footer && (
            <p className="mt-4 text-xs sm:text-sm text-slate-400">
              {slide.footer}
            </p>
          )}
        </div>
      );
    }

    // SLIDE com pillSections (Escopo geral)
    if (slide.pillSections && slide.id === 'escopo-geral') {
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
          {renderCardsGrid(slide.pillSections, accent)}
        </div>
      );
    }

    // SLIDE específico: onboarding 0–90
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
                    {renderHighlightedText(
                      item,
                      slide.highlightWords,
                      accent
                    )}
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
                  {renderHighlightedText(
                    item,
                    slide.highlightWords,
                    accent
                  )}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {slide.companyLogos && renderCompanyLogos(slide.companyLogos)}

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

      {/* header fixo com logo */}
      <header className="z-10 w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-24 sm:w-28">
            <Image
              src="/gc-assets/tgroup-logo.png"
              alt="T.Group"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Gente e Cultura
            </span>
            <span className="text-sm sm:text-base text-slate-300">
              Plano 2026 • Slide {index + 1} de {total}
            </span>
          </div>
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
