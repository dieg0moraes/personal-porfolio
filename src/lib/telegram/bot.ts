const TELEGRAM_API_URL = "https://api.telegram.org/bot";
const TELEGRAM_FILE_URL = "https://api.telegram.org/file/bot";

interface TelegramFile {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

interface GetFileResponse {
  ok: boolean;
  result?: TelegramFile;
}

export async function downloadTelegramPhoto(fileId: string): Promise<Buffer | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error("Telegram bot token not configured");
    return null;
  }

  try {
    // Get file path from Telegram
    const fileResponse = await fetch(`${TELEGRAM_API_URL}${token}/getFile?file_id=${fileId}`);
    const fileData: GetFileResponse = await fileResponse.json();

    if (!fileData.ok || !fileData.result?.file_path) {
      console.error("Could not get file path from Telegram");
      return null;
    }

    // Download the file
    const downloadUrl = `${TELEGRAM_FILE_URL}${token}/${fileData.result.file_path}`;
    const downloadResponse = await fetch(downloadUrl);

    if (!downloadResponse.ok) {
      console.error("Could not download file from Telegram");
      return null;
    }

    const arrayBuffer = await downloadResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error downloading Telegram photo:", error);
    return null;
  }
}

export async function sendTelegramMessage(
  chatId: number,
  text: string
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error("Telegram bot token not configured");
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
}

export function formatSuccessMessage(title: string, slug: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techbydie.dev";
  const thoughtUrl = `${siteUrl}/thoughts/${slug}`;

  let message = `<b>Thought publicado</b>\n\n`;
  message += `<b>Título:</b> ${title}\n`;
  message += `<b>Link:</b> ${thoughtUrl}`;

  return message;
}

export function formatErrorMessage(error: string): string {
  return `<b>Error</b>\n\n${error}`;
}
