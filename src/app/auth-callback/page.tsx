"use client";
import React from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import { trpc } from "../_trpc/client";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { isLoading, user } = useKindeBrowserClient();

  if (!isLoading && !user) {
    redirect("/api/auth/login");
  }

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },

    onError: (err) => {
      // console.log("ERROR:", err);
      if (err.data?.code == "UNAUTHORIZED") {
        // router.push("/sign-in");
        redirect("/api/auth/login");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
