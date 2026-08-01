export interface UploadResponse {
  success: boolean;
  key: string;
  url: string;
}

export async function uploadFile(
  file: File,
  folder: string
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Upload failed.");
  }

  return data;
}