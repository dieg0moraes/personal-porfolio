const TELEGRAM_API_URL = "https://api.telegram.org/bot";

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

export function formatSuccessMessage(
  title: string,
  slug: string,
  xPostId: string | null
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techbydie.dev";
  const thoughtUrl = `${siteUrl}/thoughts/${slug}`;

  let message = `<b>Thought publicado</b>\n\n`;
  message += `<b>Título:</b> ${title}\n`;
  message += `<b>Link:</b> ${thoughtUrl}`;

  if (xPostId) {
    message += `\n<b>X:</b> https://x.com/i/web/status/${xPostId}`;
  }

  return message;
}

export function formatErrorMessage(error: string): string {
  return `<b>Error</b>\n\n${error}`;
}
