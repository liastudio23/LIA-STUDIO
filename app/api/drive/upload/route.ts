import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "No se recibió archivo",
      });
    }

    return NextResponse.json({
      success: true,
      fileName: (file as File).name,
      size: (file as File).size,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Error procesando archivo",
    });
  }
}