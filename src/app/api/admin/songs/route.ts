import { NextResponse } from "next/server";
import { getSongsData } from "@/lib/sheets.ts";

export async function GET() {
  try {
    const spreadsheetId = "1aSVTDdzjWQdZNQljF4ZirO-SGFCiQD4pXkXahzS2Alw";
    const range = "Canciones!A:E";

    const data = await getSongsData(spreadsheetId, range);

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const songs = data.slice(1).map((row: any[]) => ({
      nombre: row[0] || "",
      email: row[1] || "",
      fecha: row[2] || "",
      cancionSugerida: row[3] || "",
      link: row[4] || "",
    }));

    return NextResponse.json(songs);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener datos de canciones" },
      { status: 500 },
    );
  }
}
