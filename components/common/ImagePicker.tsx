"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImagePickerProps {
  label: string;
  required?: boolean;
  onFileSelect?: (file: File) => void;
}

export default function ImagePicker({
  label,
  required = false,
  onFileSelect,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        required={required}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            setPreview(URL.createObjectURL(file));
            onFileSelect?.(file);
          }
        }}
      />

      <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              width={180}
              height={180}
              className="mx-auto rounded-lg object-cover"
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Change Image
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              No image selected
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Choose Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}