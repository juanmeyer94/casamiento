import { NextResponse } from "next/server";
import { appendToSongsSheet } from "../../../lib/sheets.ts";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name, email, song, link,
  } = body;

  if (!name || !song || !email) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios (nombre, correo y canción)" },
      { status: 400 },
    );
  }

  try {
    await appendToSongsSheet({
      name,
      email,
      song,
      link,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    Error("Error al agregar canción:", error);
    return NextResponse.json(
      { error: "Error interno al agregar la canción" },
      { status: 500 },
    );
  }
}
