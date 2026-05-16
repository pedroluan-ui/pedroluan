"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiBriefcase, FiMail, FiPhone, FiUserCheck } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurriculoById } from "@/lib/curriculo-storage";
import type { Curriculum } from "@/lib/types";

export function CurriculoDetail({ id }: { id: string }) {
  const [curriculo, setCurriculo] = useState<Curriculum | null | undefined>(undefined);

  useEffect(() => {
    setCurriculo(getCurriculoById(id));
  }, [id]);

  if (curriculo === undefined) {
    return <div className="rounded-2xl border bg-white p-8 text-slate-500">Carregando currículo...</div>;
  }

  if (!curriculo) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <h1 className="text-2xl font-black text-slate-950">Currículo não encontrado</h1>
        <p className="mt-2 text-slate-600">O registro pode não existir no localStorage deste navegador.</p>
        <Button asChild className="mt-6">
          <Link href="/sistema/paginas/curriculos">Voltar para a lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/sistema/paginas/curriculos">
          <FiArrowLeft aria-hidden /> Voltar
        </Link>
      </Button>

      <Card className="overflow-hidden bg-white shadow-soft">
        <div className="bg-gradient-to-br from-blue-700 to-cyan-500 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image src={curriculo.imagem} alt={`Foto de ${curriculo.nome}`} width={112} height={112} className="rounded-3xl border-4 border-white/60 bg-white" />
            <div>
              <h1 className="text-3xl font-black sm:text-4xl">{curriculo.nome}</h1>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-blue-50">
                <FiBriefcase aria-hidden /> {curriculo.cargoDesejado}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-blue-50">
                <span className="flex items-center gap-2"><FiMail aria-hidden /> {curriculo.email}</span>
                <span className="flex items-center gap-2"><FiPhone aria-hidden /> {curriculo.telefone}</span>
                <span className="flex items-center gap-2"><FiUserCheck aria-hidden /> CPF {curriculo.cpf}</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">Resumo profissional</h2>
          <p className="mt-3 leading-7 text-slate-600">{curriculo.resumo}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {curriculo.habilidades.map((habilidade) => (
              <Badge key={habilidade}>{habilidade}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Experiências profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {curriculo.experiencias.map((experiencia, index) => (
              <div key={`${experiencia.empresa}-${index}`} className="rounded-2xl border bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">{experiencia.cargo}</h3>
                <p className="text-sm font-semibold text-blue-700">{experiencia.empresa}</p>
                <p className="mt-1 text-sm text-slate-500">{experiencia.inicio} — {experiencia.fim}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{experiencia.descricao}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Formações acadêmicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {curriculo.formacoes.map((formacao, index) => (
              <div key={`${formacao.instituicao}-${index}`} className="rounded-2xl border bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">{formacao.curso}</h3>
                <p className="text-sm font-semibold text-blue-700">{formacao.instituicao}</p>
                <p className="mt-1 text-sm text-slate-500">{formacao.inicio} — {formacao.fim}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
