import { NextResponse } from "next/server";
import { createFolder } from "@/app/lib/google-drive";

export async function GET() {
  try {
    const clienteFolder = await createFolder(
      "Cliente Demo",
      "14mmifnrSkdMuuZduHOBm7ejMXyRspLUv"
    );

    const entregaFolder = await createFolder(
      "Video Final",
      clienteFolder.id!
    );

    return NextResponse.json({
      success: true,
      clienteFolder,
      entregaFolder,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "No se pudo crear la carpeta",
    });
  }
}