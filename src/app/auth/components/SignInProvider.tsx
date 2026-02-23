"use client";

import { ProviderId } from "@auth/core/providers";
import { signIn } from "next-auth/react";
import Image from "next/image";
interface Props {
  text: string;
  provider: ProviderId;
  image: string;
}

export default function SignInProvider({ text, provider, image }: Props) {
  return (
    <button
      onClick={() => signIn(provider, { redirectTo: "/application" })}
      className="flex justify-center items-center gap-3 font-medium border-transparent hover:border-accent  border px-3 py-2 rounded-sm cursor-pointer"
    >
      <Image src={image} alt="" width={55} height={55} />
      {text}
    </button>
  );
}
