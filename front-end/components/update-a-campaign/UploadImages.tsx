"use client";

import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/fileuploader";
import Image from "next/image";
import { DropzoneOptions } from "react-dropzone";
import { Trash2 as RemoveIcon } from "lucide-react";

interface UploadImagesProps {
  files: File[] | null;
  onFilesChange: (files: File[] | null) => void;
  uploadedImages?: string[];
  setUploadedImages?: (images: string[]) => void;
}

const UploadImages = ({
  files,
  onFilesChange,
  uploadedImages,
  setUploadedImages,
}: UploadImagesProps) => {
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: uploadedImages ? 5 - uploadedImages.length : 5,
    maxSize: 5 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const handleRemoveImage = (index: number) => {
    if (uploadedImages === undefined) return;

    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages?.(newUploadedImages || []);
  };

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
              className="size-20 p-0 object-cover"
            />
          </FileUploaderItem>
        ))}
        {uploadedImages?.map((item, index) => (
          <div key={index} className="flex relative">
            <Image
              src={item}
              alt={item}
              height={80}
              width={80}
              className="size-20 p-0 object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 p-1"
            >
              <RemoveIcon className="w-4 h-4 hover:stroke-destructive duration-200 ease-in-out" />
            </button>
          </div>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default UploadImages;
