export interface ValidationResult {
  valid: boolean;
  message?: string;
}

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

export function validateImage(
  file: File
): ValidationResult {
  if (!allowedImageTypes.includes(file.type)) {
    return {
      valid: false,
      message:
        "Only JPG, PNG and WEBP images are allowed.",
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      message:
        "Image size must be less than 2 MB.",
    };
  }

  return {
    valid: true,
  };
}