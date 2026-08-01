import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { r2Client } from "./client";
import { StorageService } from "@/app/interfaces/storage.interface";

export class CloudflareR2StorageService implements StorageService {
  constructor(
    private readonly bucketName = process.env.R2_BUCKET_NAME!
  ) {}

  async uploadFile(
    key: string,
    file: Buffer,
    contentType: string
  ): Promise<string> {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
      })
    );

    return `${process.env.R2_PUBLIC_URL}/${key}`;
  }

  async deleteFile(key: string): Promise<void> {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })
    );
  }

  async fileExists(key: string): Promise<boolean> {
    try {
      await r2Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        })
      );

      return true;
    } catch {
      return false;
    }
  }
}