import { google } from "googleapis";
import path from "path";

export async function appendToSheet({ name, email, attending, message }: {
  name: string;
  email: string;
  attending: string;
  message: string;
}) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1aSVTDdzjWQdZNQljF4ZirO-SGFCiQD4pXkXahzS2Alw";
  const range = "Test!A:E";; 

  const resource = {
    values: [[new Date().toLocaleString(), name, email, attending, message]], 
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS", 
    requestBody: resource,
  });
}
