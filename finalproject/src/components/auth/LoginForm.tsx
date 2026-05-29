"use client";

import type { FormEvent } from "react";
import type { FormState } from "@/types/form-state.type";
import type { AuthSession } from "../../models/user.model";
import type { UserRole } from "@/types/role.type";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const ADMIN_ROLE: UserRole = "ROLE_ADMIN";

interface LoginFormProps {
  onSuccess?: (session: AuthSession) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFormState("submitting");

    try {
      const session = await signIn({ email, password });

      if (!session.token) {
        throw new Error("La contraseña no es válida o la sesión no pudo iniciarse.");
      }

      setFormState("success");
      onSuccess?.(session);

      const target = session.user.role === ADMIN_ROLE ? "/admin" : "/";
      router.replace(target);
    } catch (requestError) {
      setFormState("error");
      setError(requestError instanceof Error ? requestError.message : "No se pudo iniciar sesión");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form auth-form--compact">
      <p className="auth-form__eyebrow">Acceso</p>
      <h2 className="auth-form__title">Bienvenido de nuevo</h2>
      <p className="auth-form__description">Ingresa tus credenciales para continuar en ShopWave Fusion.</p>

      <div className="auth-fields">
        <label className="auth-field">
          <span className="auth-label">Correo electrónico</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="auth-input" placeholder="correo@empresa.com" />
        </label>

        <label className="auth-field">
          <span className="auth-label">Contraseña</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="auth-input" placeholder="********" />
        </label>
      </div>

      {error ? <p className="auth-error">{error}</p> : null}

      <button disabled={loading || formState === "submitting"} type="submit" className="auth-button">
        Entrar
      </button>

      <p className="auth-footnote">
        ¿No tienes cuenta?{" "}
        <Link className="auth-link" href="/register">
          Crear usuario
        </Link>
      </p>
    </form>
  );
}