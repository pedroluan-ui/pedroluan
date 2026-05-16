import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { CurriculoList } from "@/components/curriculos/curriculo-list";
import { Button } from "@/components/ui/button";

export default function CurriculosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Banco de talentos</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Lista de currículos</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Pesquise em tempo real por nome ou cargo e acesse os detalhes completos de cada candidato.
          </p>
        </div>
        <Button asChild>
          <Link href="/sistema/paginas/curriculos/novo">
            <FiPlusCircle aria-hidden /> Novo currículo
          </Link>
        </Button>
      </div>
      <CurriculoList />
    </section>
  );
}
