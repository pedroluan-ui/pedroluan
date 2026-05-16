import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 TalentHub Currículos. Interface acadêmica com dados mockados.</p>
        <div className="flex gap-4">
          <Link className="font-medium hover:text-blue-700" href="/sistema/paginas/curriculos">
            Banco de talentos
          </Link>
          <Link className="font-medium hover:text-blue-700" href="/sistema/paginas/curriculos/novo">
            Novo currículo
          </Link>
        </div>
      </div>
    </footer>
  );
}
