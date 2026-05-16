"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFileText, FiHome, FiPlusCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: FiHome, exact: true },
  { href: "/sistema/paginas/curriculos", label: "Currículos", icon: FiFileText },
  { href: "/sistema/paginas/curriculos/novo", label: "Cadastrar", icon: FiPlusCircle, exact: true },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {links.map((link) => {
        const Icon = link.icon;
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              active && "bg-blue-600 text-white shadow-soft hover:bg-blue-700 hover:text-white",
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon aria-hidden />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
