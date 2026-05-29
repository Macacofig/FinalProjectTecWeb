"use client";

import type { ReactNode } from "react";
import type { UserRole } from "@/types/role.type";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import AppHeader from "./AppHeader";
import LoginModal from "../auth/LoginModal";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);
const ADMIN_ROLE: UserRole = "ROLE_ADMIN";

export default function AppRouteGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, user, openLoginModal } = useAuth();

  const isPublicRoute = pathname ? PUBLIC_ROUTES.has(pathname) : false;
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (loading) {
      return;
    }

    if (pathname === "/login") {
      openLoginModal();
      return;
    }

    if (!isPublicRoute && !isAuthenticated) {
      openLoginModal();
      return;
    }

    if (isPublicRoute && isAuthenticated) {
      const redirectPath = user?.role === ADMIN_ROLE ? "/admin" : "/";
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isPublicRoute, loading, openLoginModal, pathname, router, user?.role]);

  return (
    <>
      <LoginModal />
      {loading ? (
        <div className="route-status">Validando sesión...</div>
      ) : !isPublicRoute && !isAuthenticated ? (
        <div className="route-status">Mostrando acceso seguro...</div>
      ) : isPublicRoute ? (
        <>{children}</>
      ) : isAdminRoute ? (
        <>{children}</>
      ) : (
        <div className="app-shell">
          <AppHeader />
          <div>{children}</div>
        </div>
      )}
    </>
  );
}