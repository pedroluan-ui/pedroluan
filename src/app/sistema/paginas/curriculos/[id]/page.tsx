import { CurriculoDetail } from "@/components/curriculos/curriculo-detail";

export default async function CurriculoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <CurriculoDetail id={id} />
    </section>
  );
}
