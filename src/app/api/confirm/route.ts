import { NextResponse } from "next/server";
import { appendToSheet } from "../../../lib/sheets.ts";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name, email, attending, peopleCount, vegetarianMenu, message,
  } = body;

  if (!email || !name) {
    return NextResponse.json(
      { error: "Faltan datos" },
      { status: 400 },
    );
  }

  try {
    await appendToSheet({
      name, email, attending, peopleCount, vegetarianMenu, message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
