import { NextRequest, NextResponse } from "next/server";
import { createFolder } from "@/app/lib/google-drive";

const ROOT_FOLDER_ID = "14mmifnrSkdMuuZduHOBm7ejMXyRspLUv";

export async function POST(req: NextRequest) {
  try {
    const { clientName, title } = await req.json();

    const clienteFolder = await createFolder(
      clientName,
      ROOT_FOLDER_ID
    );

    const entregaFolder = await createFolder(
      title,
      clienteFolder.id!
    );

    return NextResponse.json({
      success: true,
      clienteFolderId: clienteFolder.id,
      entregaFolderId: entregaFolder.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Error creando carpetas",
    });
  }
}