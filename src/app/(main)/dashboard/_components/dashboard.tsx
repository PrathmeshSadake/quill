"use client";
import axios from "axios";
import { Ghost } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

import UploadButton from "./upload-button";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: async () => await axios.get("/api/files"),
  });

  return (
    <main className='mx-auto max-w-7xl md:py-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-4xl text-gray-900 font-semibold'>My Files</h1>
        <UploadButton />
      </div>
      {/* Display all user files */}
      <div>
        {data?.data.files && data?.data.files.length ? (
          <div></div>
        ) : isLoading ? (
          <Skeleton height={100} className='my-2' count={4} />
        ) : (
          <div className='mt-16 flex flex-col items-center gap-2'>
            <Ghost className='h-8 w-8 text-zinc-800' />
            <h3 className='font-semibold text-xl'>Pretty empty around here</h3>
            <p>Let&apos;s upload your first PDF.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
