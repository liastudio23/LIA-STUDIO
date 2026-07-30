import { NextResponse } from "next/server";
import { createFolder } from "@/app/lib/google-drive";

export async function GET() {
  try {
    const folder = await createFolder(
      "TEST_FOLDER",
      "14mmifnrSkdMuuZduHOBm7ejMXyRspLUv"
    );

    return NextResponse.json({
      success: true,
      folder,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "No se pudo crear la carpeta",
    });
  }
}