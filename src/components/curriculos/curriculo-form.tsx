"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask-next";
import { toast } from "sonner";
import * as yup from "yup";
import { FiPlus, FiSave, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveCurriculo } from "@/lib/curriculo-storage";
import type { Curriculum } from "@/lib/types";

type CurriculumFormData = {
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  habilidades: string;
  imagemFake?: FileList;
  experiencias: {
    empresa: string;
    cargo: string;
    inicio: string;
    fim: string;
    descricao: string;
  }[];
  formacoes: {
    instituicao: string;
    curso: string;
    inicio: string;
    fim: string;
  }[];
};

const textRequired = "Este campo é obrigatório.";

const schema = yup.object({
  nome: yup.string().required(textRequired).min(3, "Informe pelo menos 3 caracteres para o nome."),
  cargoDesejado: yup.string().required(textRequired).min(3, "Informe pelo menos 3 caracteres para o cargo."),
  email: yup.string().required(textRequired).email("Informe um e-mail válido."),
  telefone: yup.string().required(textRequired).matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone deve seguir o formato (99) 99999-9999."),
  cpf: yup.string().required(textRequired).matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve seguir o formato 999.999.999-99."),
  resumo: yup.string().required(textRequired).min(40, "Resumo profissional deve ter no mínimo 40 caracteres."),
  habilidades: yup.string().required(textRequired).min(5, "Informe habilidades separadas por vírgula."),
  imagemFake: yup.mixed<FileList>().optional(),
  experiencias: yup.array().of(
    yup.object({
      empresa: yup.string().required("Empresa da experiência é obrigatória."),
      cargo: yup.string().required("Cargo da experiência é obrigatório."),
      inicio: yup.string().required("Data inicial da experiência é obrigatória.").matches(/^\d{2}\/\d{4}$/, "Use MM/AAAA na data inicial da experiência."),
      fim: yup.string().required("Data final da experiência é obrigatória.").matches(/^\d{2}\/\d{4}$/, "Use MM/AAAA na data final da experiência."),
      descricao: yup.string().required("Descrição da experiência é obrigatória.").min(20, "Descrição da experiência deve ter no mínimo 20 caracteres."),
    }),
  ).required().min(1, "Adicione pelo menos uma experiência profissional."),
  formacoes: yup.array().of(
    yup.object({
      instituicao: yup.string().required("Instituição da formação é obrigatória."),
      curso: yup.string().required("Curso da formação é obrigatório."),
      inicio: yup.string().required("Data inicial da formação é obrigatória.").matches(/^\d{2}\/\d{4}$/, "Use MM/AAAA na data inicial da formação."),
      fim: yup.string().required("Data final da formação é obrigatória.").matches(/^\d{2}\/\d{4}$/, "Use MM/AAAA na data final da formação."),
    }),
  ).required().min(1, "Adicione pelo menos uma formação acadêmica."),
});

function getFirstError(errors: FieldErrors<CurriculumFormData>): string | undefined {
  for (const value of Object.values(errors)) {
    if (!value) continue;
    if ("message" in value && typeof value.message === "string") return value.message;
    if (Array.isArray(value)) {
      for (const item of value) {
        const nested = getFirstError(item as FieldErrors<CurriculumFormData>);
        if (nested) return nested;
      }
    }
    if (typeof value === "object") {
      const nested = getFirstError(value as FieldErrors<CurriculumFormData>);
      if (nested) return nested;
    }
  }
  return undefined;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function CurriculoForm() {
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<CurriculumFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cargoDesejado: "",
      email: "",
      telefone: "",
      cpf: "",
      resumo: "",
      habilidades: "",
      experiencias: [{ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" }],
      formacoes: [{ instituicao: "", curso: "", inicio: "", fim: "" }],
    },
  });

  const experiencias = useFieldArray({ control, name: "experiencias" });
  const formacoes = useFieldArray({ control, name: "formacoes" });
  const selectedFile = watch("imagemFake")?.[0];

  const onSubmit = (data: CurriculumFormData) => {
    const curriculo: Curriculum = {
      id: `${slugify(data.nome)}-${Date.now()}`,
      nome: data.nome,
      cargoDesejado: data.cargoDesejado,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      resumo: data.resumo,
      experiencias: data.experiencias,
      formacoes: data.formacoes,
      habilidades: data.habilidades.split(",").map((item) => item.trim()).filter(Boolean),
      imagem: "/avatars/default.svg",
      criadoEm: new Date().toISOString(),
    };

    saveCurriculo(curriculo);
    toast.success("Currículo salvo com sucesso!", {
      description: selectedFile
        ? `Upload fake registrado para ${selectedFile.name}; imagem pública padrão aplicada.`
        : "O candidato já está disponível na lista local.",
    });
    router.push(`/sistema/paginas/curriculos/${curriculo.id}`);
  };

  const onInvalid = (invalidErrors: FieldErrors<CurriculumFormData>) => {
    toast.error("Não foi possível salvar o currículo.", {
      description: getFirstError(invalidErrors) ?? "Revise os campos obrigatórios destacados.",
    });
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Dados pessoais e objetivo</CardTitle>
          <CardDescription>Preencha os dados principais do candidato com validação e máscaras.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Nome" error={errors.nome?.message}>
            <Input {...register("nome")} placeholder="Ex.: Camila Rocha" />
          </Field>
          <Field label="Cargo desejado" error={errors.cargoDesejado?.message}>
            <Input {...register("cargoDesejado")} placeholder="Ex.: Desenvolvedora Full Stack" />
          </Field>
          <Field label="E-mail" error={errors.email?.message}>
            <Input {...register("email")} type="email" placeholder="nome@email.com" />
          </Field>
          <Field label="Telefone" error={errors.telefone?.message}>
            <Controller
              control={control}
              name="telefone"
              render={({ field }) => (
                <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
                  <Input placeholder="(99) 99999-9999" />
                </InputMask>
              )}
            />
          </Field>
          <Field label="CPF" error={errors.cpf?.message}>
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <InputMask mask="999.999.999-99" value={field.value} onChange={field.onChange} onBlur={field.onBlur}>
                  <Input placeholder="999.999.999-99" />
                </InputMask>
              )}
            />
          </Field>
          <Field label="Foto do candidato (upload fake)" error={errors.imagemFake?.message}>
            <div className="flex items-center gap-4">
              <Image src="/avatars/default.svg" alt="Prévia padrão do candidato" width={56} height={56} className="rounded-2xl border bg-blue-50" />
              <Input {...register("imagemFake")} type="file" accept="image/*" />
            </div>
            {selectedFile && <p className="mt-2 flex items-center gap-2 text-xs font-medium text-blue-700"><FiUploadCloud aria-hidden /> {selectedFile.name} selecionado para upload fake.</p>}
          </Field>
          <Field className="md:col-span-2" label="Resumo profissional" error={errors.resumo?.message}>
            <Textarea {...register("resumo")} placeholder="Descreva trajetória, diferenciais e objetivos do candidato..." />
          </Field>
          <Field className="md:col-span-2" label="Habilidades" error={errors.habilidades?.message}>
            <Input {...register("habilidades")} placeholder="React, Liderança, SQL, UX Research" />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Experiências profissionais</CardTitle>
            <CardDescription>Adicione ou remova experiências com useFieldArray.</CardDescription>
          </div>
          <Button type="button" variant="outline" onClick={() => experiencias.append({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}>
            <FiPlus aria-hidden /> Adicionar experiência
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          {experiencias.fields.map((field, index) => (
            <div key={field.id} className="rounded-2xl border bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-950">Experiência {index + 1}</h3>
                <Button type="button" variant="ghost" size="sm" disabled={experiencias.fields.length === 1} onClick={() => experiencias.remove(index)}>
                  <FiTrash2 aria-hidden /> Remover
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Empresa" error={errors.experiencias?.[index]?.empresa?.message}>
                  <Input {...register(`experiencias.${index}.empresa`)} placeholder="Nome da empresa" />
                </Field>
                <Field label="Cargo" error={errors.experiencias?.[index]?.cargo?.message}>
                  <Input {...register(`experiencias.${index}.cargo`)} placeholder="Cargo ocupado" />
                </Field>
                <Field label="Início" error={errors.experiencias?.[index]?.inicio?.message}>
                  <Controller control={control} name={`experiencias.${index}.inicio`} render={({ field: maskField }) => (
                    <InputMask mask="99/9999" value={maskField.value} onChange={maskField.onChange} onBlur={maskField.onBlur}>
                      <Input placeholder="MM/AAAA" />
                    </InputMask>
                  )} />
                </Field>
                <Field label="Fim" error={errors.experiencias?.[index]?.fim?.message}>
                  <Controller control={control} name={`experiencias.${index}.fim`} render={({ field: maskField }) => (
                    <InputMask mask="99/9999" value={maskField.value} onChange={maskField.onChange} onBlur={maskField.onBlur}>
                      <Input placeholder="MM/AAAA" />
                    </InputMask>
                  )} />
                </Field>
                <Field className="md:col-span-2" label="Descrição" error={errors.experiencias?.[index]?.descricao?.message}>
                  <Textarea {...register(`experiencias.${index}.descricao`)} placeholder="Principais responsabilidades, projetos e resultados..." />
                </Field>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Formações acadêmicas</CardTitle>
            <CardDescription>Campos dinâmicos também para a trajetória acadêmica.</CardDescription>
          </div>
          <Button type="button" variant="outline" onClick={() => formacoes.append({ instituicao: "", curso: "", inicio: "", fim: "" })}>
            <FiPlus aria-hidden /> Adicionar formação
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          {formacoes.fields.map((field, index) => (
            <div key={field.id} className="rounded-2xl border bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold text-slate-950">Formação {index + 1}</h3>
                <Button type="button" variant="ghost" size="sm" disabled={formacoes.fields.length === 1} onClick={() => formacoes.remove(index)}>
                  <FiTrash2 aria-hidden /> Remover
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Instituição" error={errors.formacoes?.[index]?.instituicao?.message}>
                  <Input {...register(`formacoes.${index}.instituicao`)} placeholder="Nome da instituição" />
                </Field>
                <Field label="Curso" error={errors.formacoes?.[index]?.curso?.message}>
                  <Input {...register(`formacoes.${index}.curso`)} placeholder="Nome do curso" />
                </Field>
                <Field label="Início" error={errors.formacoes?.[index]?.inicio?.message}>
                  <Controller control={control} name={`formacoes.${index}.inicio`} render={({ field: maskField }) => (
                    <InputMask mask="99/9999" value={maskField.value} onChange={maskField.onChange} onBlur={maskField.onBlur}>
                      <Input placeholder="MM/AAAA" />
                    </InputMask>
                  )} />
                </Field>
                <Field label="Fim" error={errors.formacoes?.[index]?.fim?.message}>
                  <Controller control={control} name={`formacoes.${index}.fim`} render={({ field: maskField }) => (
                    <InputMask mask="99/9999" value={maskField.value} onChange={maskField.onChange} onBlur={maskField.onBlur}>
                      <Input placeholder="MM/AAAA" />
                    </InputMask>
                  )} />
                </Field>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button asChild variant="outline">
          <a href="/sistema/paginas/curriculos">Cancelar</a>
        </Button>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          <FiSave aria-hidden /> {isSubmitting ? "Salvando..." : "Salvar currículo"}
        </Button>
      </div>
    </form>
  );
}

function Field({ children, className, error, label }: { children: React.ReactNode; className?: string; error?: string; label: string }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
