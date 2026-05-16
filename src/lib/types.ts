export type Experience = {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
};

export type Education = {
  instituicao: string;
  curso: string;
  inicio: string;
  fim: string;
};

export type Curriculum = {
  id: string;
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencias: Experience[];
  formacoes: Education[];
  habilidades: string[];
  imagem: string;
  criadoEm: string;
};
