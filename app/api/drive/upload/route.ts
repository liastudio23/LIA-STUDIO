import { NextResponse } from "next/server";
import { uploadBuffer } from "@/app/lib/google-drive";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "No se recibió archivo",
      });
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const uploadedFile = await uploadBuffer(
      buffer,
      file.name,
      file.type,
      "14mmifnrSkdMuuZduHOBm7ejMXyRspLUv"
    );

    return NextResponse.json({
      success: true,
      uploadedFile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Error subiendo archivo",
    });
  }
}