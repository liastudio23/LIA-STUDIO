import fs from "fs";
import mime from "mime-types";
import { google } from "googleapis";
import path from "path";
import { Readable } from "stream";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const drive = google.drive({
  version: "v3",
  auth,
});

export async function createFolder(
  name: string,
  parentFolderId: string
) {

  
  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolderId],
    },
    fields: "id,name",
    supportsAllDrives: true,
  });

  return response.data;
}

export async function uploadFile(
  filePath: string,
  fileName: string,
  folderId: string
) {
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType:
        mime.lookup(fileName) || "application/octet-stream",
      body: fs.createReadStream(filePath),
    },
    fields: "id,name",
    supportsAllDrives: true,
  });

  return response.data;
}

export async function uploadBuffer(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId: string
) {

  const stream = Readable.from(buffer);

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: stream,
    },
    fields: "id,name",
    supportsAllDrives: true,
  });

  return response.data;
}