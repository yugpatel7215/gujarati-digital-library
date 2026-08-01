"use client";

import { useState, useTransition } from "react";
import { ResourceType } from "@prisma/client";

import ImagePicker from "@/components/common/ImagePicker";
import FilePicker from "@/components/common/FilePicker";

import { uploadFile } from "@/lib/r2/upload";

import {
  createResource,
  updateResource,
} from "@/app/admin/resources/actions";

interface Category {
  id: string;
  name: string;
}

interface Resource {
  id: string;
  title: string;
  author: string | null;
  language: string;
  description: string | null;
  thumbnailUrl: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  type: ResourceType;
  categoryId: string;
}

interface ResourceFormProps {
  categories: Category[];
  resource?: Resource;
}

export default function ResourceForm({
  categories,
  resource,
}: ResourceFormProps) {
  const [isPending, startTransition] = useTransition();

  const [resourceType, setResourceType] =
    useState<ResourceType>(
      resource?.type ?? ResourceType.PDF
    );

  const [thumbnailFile, setThumbnailFile] =
    useState<File | null>(null);

  const [resourceFile, setResourceFile] =
    useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Thumbnail
      if (thumbnailFile) {
        const upload = await uploadFile(
          thumbnailFile,
          "thumbnails"
        );
        formData.set(
          "thumbnailUrl",
          upload.url
        );
      } else if (resource?.thumbnailUrl) {
        formData.set(
          "thumbnailUrl",
          resource.thumbnailUrl
        );
      }

      // Resource File
      if (
        resourceType !== ResourceType.EXTERNAL_LINK &&
        resourceFile
      ) {
        const upload = await uploadFile(
          resourceFile,
          "resources"
        );
        formData.set(
          "fileUrl",
          upload.url
        );
      } else if (resource?.fileUrl) {
        formData.set(
          "fileUrl",
          resource.fileUrl
        );
      }

      startTransition(async () => {
        if (resource) {
          await updateResource(
            resource.id,
            formData
          );
        } else {
          await createResource(formData);
        }
      });
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow"
      >
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Title
          </label>

          <input
            name="title"
            required
            defaultValue={resource?.title}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Author
          </label>

          <input
            name="author"
            defaultValue={resource?.author ?? ""}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Language
          </label>

          <input
            name="language"
            defaultValue={resource?.language ?? "Gujarati"}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Category
          </label>

          <select
            name="categoryId"
            required
            defaultValue={resource?.categoryId}
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Resource Type
          </label>

          <select
            name="type"
            value={resourceType}
            onChange={(e) =>
              setResourceType(
                e.target.value as ResourceType
              )
            }
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
          >
            {Object.values(ResourceType).map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <ImagePicker
          label="Thumbnail"
          onFileSelect={setThumbnailFile}
        />

        {resourceType === ResourceType.EXTERNAL_LINK ? (
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              External URL
            </label>

            <input
              type="url"
              name="externalUrl"
              defaultValue={resource?.externalUrl ?? ""}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>
        ) : (
          <FilePicker
            label={
              resourceType === ResourceType.PDF
                ? "PDF File"
                : resourceType === ResourceType.AUDIO
                  ? "Audio File"
                  : resourceType === ResourceType.VIDEO
                    ? "Video File"
                    : "EPUB File"
            }
            accept={
              resourceType === ResourceType.PDF
                ? ".pdf"
                : resourceType === ResourceType.AUDIO
                  ? "audio/*"
                  : resourceType === ResourceType.VIDEO
                    ? "video/*"
                    : ".epub"
            }
            resourceType={resourceType}
            onFileSelect={setResourceFile}
          />
        )}

        {/* Hidden fields populated after upload */}
        <input
          type="hidden"
          name="thumbnailUrl"
          defaultValue={resource?.thumbnailUrl ?? ""}
        />

        <input
          type="hidden"
          name="fileUrl"
          defaultValue={resource?.fileUrl ?? ""}
        />

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isPending
            ? "Saving..."
            : resource
              ? "Update Resource"
              : "Create Resource"}
        </button>
      </form>
    );
  }