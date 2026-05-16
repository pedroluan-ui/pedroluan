import Link from "next/link";
import { FiLayers } from "react-icons/fi";
import { Nav } from "@/components/layout/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-soft">
            <FiLayers className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">TalentHub</p>
            <p className="text-xs font-medium text-slate-500">Gestão inteligente de currículos</p>
          </div>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
