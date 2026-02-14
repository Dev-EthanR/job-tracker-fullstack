"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type Data from "../entities/Data";

interface DataType {
  data: Data[];
  setData: Dispatch<SetStateAction<Data[]>>;
}

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

export const DataCtx = createContext<DataType | null>(null);
export const ThemeCtx = createContext<ThemeType | null>(null);
export const ToastCtx = createContext<ToastType | null>(null);

export default function Providers({ children }: Props) {
  const [data, setData] = useState<Data[]>([]);
  const [toastOpen, setToastOpen] = useState<Toast>({
    open: false,
    message: null,
    color: null,
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedData = localStorage.getItem("jobData");
    if (storedData) setData(JSON.parse(storedData));

    const storedTheme =
      localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("jobData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      <DataCtx.Provider value={{ data, setData }}>
        <ToastCtx.Provider value={{ toastOpen, setToastOpen }}>
          {children}
        </ToastCtx.Provider>
      </DataCtx.Provider>
    </ThemeCtx.Provider>
  );
}
