"use client";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { CurriculoCard } from "@/components/curriculos/curriculo-card";
import { Input } from "@/components/ui/input";
import { getCurriculos } from "@/lib/curriculo-storage";
import type { Curriculum } from "@/lib/types";

export function CurriculoList() {
  const [curriculos, setCurriculos] = useState<Curriculum[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCurriculos(getCurriculos());
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return curriculos;

    return curriculos.filter((curriculo) => {
      return [curriculo.nome, curriculo.cargoDesejado].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    });
  }, [curriculos, query]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar automaticamente por nome ou cargo..."
          className="pl-10"
          aria-label="Buscar currículo por nome ou cargo"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((curriculo) => (
          <CurriculoCard key={curriculo.id} curriculo={curriculo} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500">
          Nenhum currículo encontrado para “{query}”.
        </div>
      )}
    </div>
  );
}
