"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-sans text-sm text-truffle">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="rounded-xl border border-cocoa/25 bg-linen px-4 py-2.5 font-sans text-espresso outline-none focus-visible:border-cocoa"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-sans text-sm text-truffle">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-xl border border-cocoa/25 bg-linen px-4 py-2.5 font-sans text-espresso outline-none focus-visible:border-cocoa"
        />
      </div>

      {state.error && (
        <p role="alert" className="font-sans text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
