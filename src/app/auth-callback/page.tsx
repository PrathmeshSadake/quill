"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth-callback");
      return data;
    },
  });

  if (isSuccess && data.success === true) {
    router.replace(origin!);
  }

  return <div>Page</div>;
};

export default Page;
