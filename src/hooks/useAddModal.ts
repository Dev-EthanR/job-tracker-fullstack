// context/useModal.ts
import { useContext } from "react";
import { AddModalCtx } from "@/src/app/components/Header";

export default function useAddModal() {
  const ctx = useContext(AddModalCtx);

  if (!ctx) {
    throw new Error("useModal must be used within AddModalCtx.Provider");
  }

  return ctx;
}
