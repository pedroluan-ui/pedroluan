import { CurriculoForm } from "@/components/curriculos/curriculo-form";

export default function NovoCurriculoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Cadastro</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Novo currículo</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Complete os dados do candidato. Campos dinâmicos, máscaras e validações exibem feedback imediato.
        </p>
      </div>
      <CurriculoForm />
    </section>
  );
}
