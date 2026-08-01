export interface StorageService {
  uploadFile(
    key: string,
    file: Buffer,
    contentType: string
  ): Promise<string>;

  deleteFile(key: string): Promise<void>;

  fileExists(key: string): Promise<boolean>;
}