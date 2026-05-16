import Link from "next/link";
import { FiCheckCircle, FiClock, FiSearch, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Triagem mais rápida",
    description: "Cards objetivos, busca em tempo real e detalhes organizados aceleram a análise de candidatos.",
    icon: FiClock,
  },
  {
    title: "Dados consistentes",
    description: "Validações com Yup e máscaras de entrada reduzem erros em telefone, CPF, datas e contatos.",
    icon: FiShield,
  },
  {
    title: "Gestão visual",
    description: "Interface clean com componentes inspirados no shadcn/ui e feedback instantâneo via Sonner.",
    icon: FiSearch,
  },
];

export default function Home() {
  return (
    <div className="hero-grid">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            Sistema de Gestão de Currículos
          </span>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Organize candidatos com uma experiência moderna e responsiva.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Cadastre currículos completos, gerencie experiências e formações dinâmicas, filtre talentos por nome ou cargo e acompanhe detalhes em uma jornada fluida.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/sistema/paginas/curriculos/novo">Cadastrar currículo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sistema/paginas/curriculos">Ver banco de talentos</Link>
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-blue-100 bg-white/95 shadow-soft">
          <CardHeader className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
            <CardTitle>Painel de refinamento</CardTitle>
            <CardDescription className="text-blue-50">Boas práticas aplicadas à etapa 1 do projeto.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            {[
              "Next.js App Router com rotas dinâmicas",
              "React Hook Form, Yup e Field Arrays",
              "Tailwind CSS responsivo e estados acessíveis",
              "Persistência mockada com localStorage",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border bg-slate-50 p-4">
                <FiCheckCircle className="h-5 w-5 shrink-0 text-blue-600" aria-hidden />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-3 lg:px-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.title} className="bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <CardHeader>
                <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <CardDescription className="leading-6">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
