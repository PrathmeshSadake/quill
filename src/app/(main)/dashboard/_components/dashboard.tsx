"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import {
  FileText,
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { File } from "@prisma/client";
import UploadButton from "./upload-button";
import { Button } from "@/components/ui/button";
import { extractNameFromFilename } from "@/lib/utils";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: async () => await axios.get("/api/files"),
  });

  const { mutate: deleteFile } = useMutation({
    mutationFn: ({ id }) => {
      return axios.delete("/api/files", {
        data: {
          id,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onMutate: ({ id }: { id: string }) => {
      setCurrentlyDeletingFile(id);
    },
    onSettled: () => {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className='mx-auto max-w-7xl md:py-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 text-4xl text-gray-900 font-semibold'>My Files</h1>
        <UploadButton />
      </div>
      {/* Display all user files */}
      <div>
        {data?.data && data?.data.length > 0 ? (
          <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
            {data?.data
              .sort(
                (a: File, b: File) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((file: File) => (
                <li
                  key={file.id}
                  className='col-span-1 divide-y divide-gray-200 bg-white shadow hover:shadow-lg transition'
                >
                  <Link
                    href={`/dashboard/${file.id}`}
                    className='flex flex-col gap-2'
                  >
                    <div className='pt-4 px-6 flex w-full items-center justify-between space-x-4'>
                      <FileText className='h-8 w-8 text-black' />

                      <div className='flex-1 truncate'>
                        <div className='flex items-center space-x-3'>
                          <h3 className='truncate text-lg font-medium text-zinc-900'>
                            {extractNameFromFilename(file.name)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                    <div className='flex items-center gap-2'>
                      <Plus className='h-4 w-4' />
                      {format(new Date(file.createdAt), "MMM yyyy")}
                    </div>

                    <div className='flex items-center gap-2'>
                      <MessageSquare className='h-4 w-4' />
                    </div>

                    <Button
                      onClick={() => deleteFile({ id: file.id })}
                      size='sm'
                      className='w-full'
                      variant='destructive'
                    >
                      {currentlyDeletingFile === file.id ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : (
                        <Trash className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
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
