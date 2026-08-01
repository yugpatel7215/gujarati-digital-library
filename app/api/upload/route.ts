import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { CloudflareR2StorageService } from "@/lib/r2/storage.service";

const storage = new CloudflareR2StorageService();

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE = 100 * 1024 * 1024; // 100 MB

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PDF_TYPES = [
  "application/pdf",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required." },
        { status: 400 }
      );
    }

    if (typeof folder !== "string" || folder.trim() === "") {
      return NextResponse.json(
        { message: "Folder is required." },
        { status: 400 }
      );
    }

    const isImage = IMAGE_TYPES.includes(file.type);
    const isPdf = PDF_TYPES.includes(file.type);

    if (!isImage && !isPdf) {
      return NextResponse.json(
        {
          message:
            "Only JPG, PNG, WEBP and PDF files are allowed.",
        },
        { status: 400 }
      );
    }

    if (isImage && file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          message: "Image size cannot exceed 5 MB.",
        },
        { status: 400 }
      );
    }

    if (isPdf && file.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        {
          message: "PDF size cannot exceed 100 MB.",
        },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop();

    const key = `${folder}/${randomUUID()}.${extension}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await storage.uploadFile(
      key,
      buffer,
      file.type
    );

    return NextResponse.json({
      success: true,
      key,
      url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}