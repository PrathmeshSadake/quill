"use client";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { mutate } = useMutation({
    mutationFn: async () => {
      const data = await axios.post("/api/user");
      console.log(data);
    },
    onSuccess: () => {
      router.push(origin ? `/${origin}` : "/dashboard");
    },
    onError: (error) => {
      if (error.cause === 403) return router.push("/sign-in");
      console.log(error);
    },
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
