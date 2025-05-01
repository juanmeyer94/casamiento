import { google } from "googleapis";

export default async function appendToSheet({
  name,
  email,
  attending,
  message,
}: {
  name: string;
  email: string;
  attending: string;
  message: string;
}) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1aSVTDdzjWQdZNQljF4ZirO-SGFCiQD4pXkXahzS2Alw";
  const range = "Test!A:E";

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
