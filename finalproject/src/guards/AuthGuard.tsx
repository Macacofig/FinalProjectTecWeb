"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

// todo lo que este dentro de este componente, requiere auth ( es un hijo )
export function AuthGuard({ children }: { children: ReactNode }) {
  // hook auth global : si esta autenticado, si esta cargando
  const { isAuthenticated, loading, openLoginModal } = useAuth();

  // cuando cambia auth
  useEffect(() => {
    // si terminó cargar
    // y NO está autenticado
    if (!loading && !isAuthenticated) {
      openLoginModal();
    }
  }, [isAuthenticated, loading, openLoginModal]);

  // mientras valida auth
  if (loading || !isAuthenticated) {
    return <div className="route-status">Validando sesión...</div>;
  }

  return <>{children}</>;
}