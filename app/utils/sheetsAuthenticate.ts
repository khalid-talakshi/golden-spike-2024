import { google } from "googleapis";

export const authenticateForSheets = async () => {
  const auth = await google.auth.getClient({
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ],
    keyFile: "./gcp-account.json",
  });

  return google.sheets({ version: "v4", auth });
};
