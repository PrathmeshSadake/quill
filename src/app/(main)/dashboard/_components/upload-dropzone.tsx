"use client";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadDropzone = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = useMutation({
    mutationFn: async (key: string) => {
      const res = await axios.post(`/api/files`, { key });
      return res.data;
    },
    onSuccess: (file) => {
      console.log("FILE", file);
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  // Determinate progress bar
  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((previousProgress) => {
        if (previousProgress >= 90) {
          clearInterval(interval);
          return previousProgress;
        }
        return previousProgress + 5;
      });
    }, 2000);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        console.log(acceptedFiles);
        setIsUploading(true);
        const progessInterval = startSimulatedProgress();

        // Upload file
        const res = await startUpload(acceptedFiles);
        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        const [fileResponse] = res!;
        console.log("FILE RESPONSE", fileResponse);
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }
        clearInterval(progessInterval);
        setUploadProgress(100);
        startPolling(key);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='border h-56 m-4 border-dashed border-gray-300 rounded-lg'
        >
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='w-6 h-6 text-zinc-500' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>Click to Upload</span> or drag
                  and drop a
                </p>
                <p className='text-xs text-zinc-500'>PDF (up to 4MB)</p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-gray-800' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    value={uploadProgress}
                    className='w-full h-1 bg-zinc-200'
                  />
                  {uploadProgress === 100 ? (
                    <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                      <Loader2 className='w-3 h-3 animate-spin' />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadDropzone;
