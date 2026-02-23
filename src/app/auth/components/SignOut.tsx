"use client";
import { signOut } from "next-auth/react";

export function SignOut({ style }: { style: string }) {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/auth" })}
      className={`text-center md:text-left ${style} cursor-pointer`}
    >
      Sign Out
    </button>
  );
}
