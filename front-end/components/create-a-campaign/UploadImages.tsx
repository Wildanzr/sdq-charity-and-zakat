"use client";

import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/fileuploader";
import Image from "next/image";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

interface UploadImagesProps {
  files: File[] | null;
  onFilesChange: (files: File[] | null) => void;
}

const UploadImages = ({ files, onFilesChange }: UploadImagesProps) => {
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={files}
      onValueChange={onFilesChange}
      dropzoneOptions={dropzone}
    >
      <p className="m-body-base text-neutral-base mb-2">Campaign Images</p>
      <FileInput>
        <div className="flex items-center justify-center h-32 w-full bg-primary-100 border border-primary-90 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <p className="text-neutral-base">
              Drag your images here or click to upload
            </p>
            <p className="m-body-link text-neutral-base mt-2">
              Maximum of 5 images, 5MB each
            </p>
          </div>
        </div>
      </FileInput>
      <FileUploaderContent className="flex items-center flex-row gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-20 p-0 rounded-md overflow-hidden"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              height={80}
              width={80}
              className="size-20 p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default UploadImages;
