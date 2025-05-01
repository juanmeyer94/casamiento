import { NextResponse } from "next/server";
import appendToSheet from "../../../lib/sheets.ts";

export default async function POST(req: Request) {
  const body = await req.json();
  const {
    name, email, attending, message,
  } = body;

  if (!email || !name) {
    return NextResponse.json(
      { error: "Faltan datos" },
      { status: 400 },
    );
  }

  try {
    await appendToSheet({
      name, email, attending, message,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 },
    );
  }
}
