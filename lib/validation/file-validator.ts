import { ResourceType } from "@prisma/client";

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const allowedMimeTypes: Record<ResourceType, string[]> = {
  PDF: [
    "application/pdf",
  ],

  AUDIO: [
    "audio/mpeg", // mp3
    "audio/mp4", // m4a
    "audio/wav",
    "audio/ogg",
    "audio/x-wav",
  ],

  VIDEO: [
    "video/mp4",
    "video/webm",
    "video/x-msvideo", // avi
    "video/quicktime", // mov
    "video/x-matroska", // mkv
  ],

  EPUB: [
    "application/epub+zip",
  ],

  EXTERNAL_LINK: [],
};

export function validateResourceFile(
  file: File,
  resourceType: ResourceType
): ValidationResult {

  if (resourceType === ResourceType.EXTERNAL_LINK) {
    return {
      valid: true,
    };
  }

  const allowedTypes = allowedMimeTypes[resourceType];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: `Invalid ${resourceType} file selected.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "Maximum file size is 100 MB.",
    };
  }

  return {
    valid: true,
  };
}