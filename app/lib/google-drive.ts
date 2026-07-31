import fs from "fs";
import mime from "mime-types";
import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    process.cwd(),
    "credentials",
    "lia-client-portal-a1ffde173524.json"
  ),
  scopes: ["https://www.googleapis.com/auth/drive"],
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
  });

  return response.data;
}


