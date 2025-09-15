import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function DELETE() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1aSVTDdzjWQdZNQljF4ZirO-SGFCiQD4pXkXahzS2Alw";

    // Borrar datos de confirmaciones (mantener solo el header)
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: "Respuestas Formulario Casamiento!A2:G1000", // Borra desde la fila 2 hasta la 1000
    });

    // Borrar datos de canciones (mantener solo el header)
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: "Respuesta Recomendaciones Canciones!A2:E1000",
    });

    return NextResponse.json({
      success: true,
      message: "Datos borrados exitosamente",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al borrar datos" },
      { status: 500 },
    );
  }
}
