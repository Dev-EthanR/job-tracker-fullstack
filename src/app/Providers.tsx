"use client";

import { SessionProvider } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface ThemeType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

interface Toast {
  open: boolean;
  message: string | null;
  color: "bg-green-600" | "bg-red-600" | null;
}

interface ToastType {
  toastOpen: Toast;
  setToastOpen: Dispatch<SetStateAction<Toast>>;
}

interface Props {
  children: ReactNode;
}

export const ThemeCtx = createContext<ThemeType | null>(null);
export const ToastCtx = createContext<ToastType | null>(null);

export default function Providers({ children }: Props) {
  const [toastOpen, setToastOpen] = useState<Toast>({
    open: false,
    message: null,
    color: null,
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <SessionProvider>
      <ThemeCtx.Provider value={{ theme, setTheme }}>
        <ToastCtx.Provider value={{ toastOpen, setToastOpen }}>
          {children}
        </ToastCtx.Provider>
      </ThemeCtx.Provider>
    </SessionProvider>
  );
}
