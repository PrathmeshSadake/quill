"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Upload } from "lucide-react";
import React, { useState } from "react";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>
          Upload PDF
          <Upload className='w-4 h-4 ml-2'/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-semibold'>Upload PDF</h1>
          <input type='file' />
          <Button onClick={() => setIsOpen(false)}>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
