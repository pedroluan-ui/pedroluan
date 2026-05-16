"use client";

import { CURRICULOS_STORAGE_KEY, mockCurriculos } from "@/lib/mock-curriculos";
import type { Curriculum } from "@/lib/types";

export function getCurriculos(): Curriculum[] {
  if (typeof window === "undefined") {
    return mockCurriculos;
  }

  const stored = window.localStorage.getItem(CURRICULOS_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(CURRICULOS_STORAGE_KEY, JSON.stringify(mockCurriculos));
    return mockCurriculos;
  }

  try {
    return JSON.parse(stored) as Curriculum[];
  } catch {
    window.localStorage.setItem(CURRICULOS_STORAGE_KEY, JSON.stringify(mockCurriculos));
    return mockCurriculos;
  }
}

export function saveCurriculo(curriculo: Curriculum) {
  const curriculos = getCurriculos();
  window.localStorage.setItem(CURRICULOS_STORAGE_KEY, JSON.stringify([curriculo, ...curriculos]));
}

export function getCurriculoById(id: string) {
  return getCurriculos().find((curriculo) => curriculo.id === id);
}
