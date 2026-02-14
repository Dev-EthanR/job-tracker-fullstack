// context/useModal.ts
import { useContext } from "react";
import { DataCtx } from "@/src/app/Providers";

export default function useData() {
  const ctx = useContext(DataCtx);

  if (!ctx) {
    throw new Error("useData must be used within useData.Provider");
  }

  return ctx;
}
