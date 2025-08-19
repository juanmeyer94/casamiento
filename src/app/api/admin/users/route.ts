import { NextResponse } from "next/server";
import { getAppendedData } from "@/lib/sheets.ts";

export async function GET() {
  try {
    const spreadsheetId = "1aSVTDdzjWQdZNQljF4ZirO-SGFCiQD4pXkXahzS2Alw";
    const range = "Test!A:E";

    const data = await getAppendedData(spreadsheetId, range);

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const users = data.slice(1).map((row: any[]) => ({
      marcaTemporal: row[0] || "",
      nombreCompleto: row[1] || "",
      email: row[2] || "",
      asistira: row[3] || "",
      comentarios: row[4] || "",
    }));

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener datos de usuarios" },
      { status: 500 },
    );
  }
}
