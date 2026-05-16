import type { Curriculum } from "@/lib/types";

export const CURRICULOS_STORAGE_KEY = "gestao-curriculos:v1";

export const mockCurriculos: Curriculum[] = [
  {
    id: "ana-silva",
    nome: "Ana Silva",
    cargoDesejado: "Product Designer",
    email: "ana.silva@email.com",
    telefone: "(11) 98888-1200",
    cpf: "123.456.789-10",
    resumo:
      "Designer de produto com foco em pesquisa, prototipação e criação de jornadas digitais acessíveis para plataformas SaaS.",
    experiencias: [
      {
        empresa: "Atlas RH Tech",
        cargo: "UX/UI Designer Pleno",
        inicio: "02/2021",
        fim: "Atual",
        descricao:
          "Condução de discovery, desenho de fluxos de cadastro e melhoria de métricas de ativação em sistemas B2B.",
      },
    ],
    formacoes: [
      {
        instituicao: "Universidade Federal de Minas Gerais",
        curso: "Design Digital",
        inicio: "02/2016",
        fim: "12/2019",
      },
    ],
    habilidades: ["Figma", "Design System", "Pesquisa com usuários", "Acessibilidade"],
    imagem: "/avatars/ana.svg",
    criadoEm: "2026-03-11T10:00:00.000Z",
  },
  {
    id: "pedro-costa",
    nome: "Pedro Costa",
    cargoDesejado: "Desenvolvedor Front-end",
    email: "pedro.costa@email.com",
    telefone: "(21) 97777-2233",
    cpf: "987.654.321-00",
    resumo:
      "Desenvolvedor front-end especializado em React, Next.js e interfaces responsivas orientadas a componentes reutilizáveis.",
    experiencias: [
      {
        empresa: "Nexo Digital",
        cargo: "Front-end Developer",
        inicio: "05/2020",
        fim: "Atual",
        descricao:
          "Implementação de dashboards em Next.js, integração com APIs REST e criação de componentes acessíveis.",
      },
      {
        empresa: "Studio Web Azul",
        cargo: "Desenvolvedor Jr.",
        inicio: "01/2018",
        fim: "04/2020",
        descricao: "Manutenção de landing pages responsivas e otimização de performance web.",
      },
    ],
    formacoes: [
      {
        instituicao: "FIAP",
        curso: "Análise e Desenvolvimento de Sistemas",
        inicio: "02/2017",
        fim: "12/2019",
      },
    ],
    habilidades: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    imagem: "/avatars/pedro.svg",
    criadoEm: "2026-02-04T14:30:00.000Z",
  },
  {
    id: "marina-alves",
    nome: "Marina Alves",
    cargoDesejado: "Analista de Dados",
    email: "marina.alves@email.com",
    telefone: "(31) 96666-3344",
    cpf: "456.789.123-55",
    resumo:
      "Analista de dados com experiência em modelagem, visualização de indicadores e storytelling para áreas de negócio.",
    experiencias: [
      {
        empresa: "DataVale Consultoria",
        cargo: "Analista BI",
        inicio: "03/2019",
        fim: "Atual",
        descricao:
          "Criação de relatórios executivos, estruturação de bases e automação de rotinas de análise comercial.",
      },
    ],
    formacoes: [
      {
        instituicao: "PUC Minas",
        curso: "Estatística",
        inicio: "02/2014",
        fim: "12/2018",
      },
    ],
    habilidades: ["Power BI", "SQL", "Python", "Storytelling"],
    imagem: "/avatars/marina.svg",
    criadoEm: "2026-01-22T09:20:00.000Z",
  },
];
