"use server"

import { getGCPCredentials } from "@/lib/utils";
import { Bucket, Storage } from "@google-cloud/storage"

let bucket: Bucket;
if (process.env.NODE_ENV === "development") {
  console.log("development")
  const storage = new Storage({
    keyFilename: "credentials.json"
  })
  bucket = storage.bucket("sdq-charity")
} else {
  console.log("production")
  const storageClient = new Storage(getGCPCredentials());
  bucket = storageClient.bucket("sdq-charity");
}


export const uploadImage = async (formData: FormData) => {
  console.log(process.env.NODE_ENV)
  const file = formData.get("image") as File;
  const sanitized = file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fileName = `${Date.now()}-${sanitized}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const fileUpload = bucket.file(fileName)

  await fileUpload.save(fileBuffer, {
    metadata: {
      contentType: file.type
    }
  })

  return fileUpload.publicUrl()
}