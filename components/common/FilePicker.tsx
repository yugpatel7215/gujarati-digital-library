"use client";

import { ResourceType } from "@prisma/client";
import { useRef, useState } from "react";

import { validateResourceFile } from "@/lib/validation/file-validator";

interface FilePickerProps {
  label: string;
  accept: string;
  resourceType: ResourceType;
  required?: boolean;
  onFileSelect?: (file: File) => void;
}

const fileIcons: Record<ResourceType, string> = {
  PDF: "📄",
  AUDIO: "🎵",
  VIDEO: "🎬",
  EPUB: "📚",
  EXTERNAL_LINK: "🔗",
};

export default function FilePicker({
  label,
  accept,
  resourceType,
  required = false,
  onFileSelect,
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  return (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"

        accept={accept}
        hidden
        required={required}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (!selectedFile) return;

          const result = validateResourceFile(
            selectedFile,
            resourceType
          );

          if (!result.valid) {
            setError(result.message ?? "");

            e.target.value = "";

            // Keep the previously selected valid file
            return;
          }

          setError("");

          setFile(selectedFile);

          onFileSelect?.(selectedFile);
        }}
      />

      <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
        {file ? (
          <>
            <p className="font-medium text-gray-900 text-lg">
              {fileIcons[resourceType]} {file.name}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Change File
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              No file selected
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              {label}
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}