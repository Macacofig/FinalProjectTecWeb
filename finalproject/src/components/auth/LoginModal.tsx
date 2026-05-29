"use client";

import Modal from "../ui/Modal";
import LoginForm from "./LoginForm";
import { useAuth } from "../../hooks/useAuth";

export default function LoginModal() {
  const { loginModalOpen, closeLoginModal } = useAuth();

  return (
    <Modal isOpen={loginModalOpen} onClose={closeLoginModal} title="Iniciar sesión">
      <LoginForm onSuccess={closeLoginModal} />
    </Modal>
  );
}