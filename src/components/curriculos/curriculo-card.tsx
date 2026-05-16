import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import type { Curriculum } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CurriculoCard({ curriculo }: { curriculo: Curriculum }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <Image
          src={curriculo.imagem}
          alt={`Foto de ${curriculo.nome}`}
          width={64}
          height={64}
          className="rounded-2xl border bg-blue-50"
        />
        <div>
          <CardTitle className="text-xl">{curriculo.nome}</CardTitle>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-blue-700">
            <FiBriefcase aria-hidden /> {curriculo.cargoDesejado}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{curriculo.resumo}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {curriculo.habilidades.slice(0, 3).map((habilidade) => (
            <Badge key={habilidade}>{habilidade}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/sistema/paginas/curriculos/${curriculo.id}`}>
            Ver detalhes <FiArrowRight aria-hidden />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
