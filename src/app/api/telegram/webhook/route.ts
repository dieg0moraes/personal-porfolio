import { NextRequest, NextResponse } from "next/server";
import { TelegramUpdate } from "@/types/thought";
import { parseMessage, validateMessage } from "@/lib/telegram/parser";
import {
  sendTelegramMessage,
  formatSuccessMessage,
  formatErrorMessage,
  downloadTelegramPhoto,
} from "@/lib/telegram/bot";
import { createThought, uploadThoughtImage } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json();

    const message = update.message;

    // Ignore non-message updates or messages without text/photo
    if (!message || (!message.text && !message.photo)) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;

    // Verify user is authorized
    const allowedUserId = process.env.TELEGRAM_ALLOWED_USER_ID;
    if (allowedUserId && userId.toString() !== allowedUserId) {
      console.log(`Unauthorized user: ${userId}`);
      return NextResponse.json({ ok: true });
    }

    // Get text from either text or caption (for photos)
    const text = message.text || message.caption;

    if (!text) {
      await sendTelegramMessage(
        chatId,
        formatErrorMessage("El mensaje debe incluir texto o un caption en la foto")
      );
      return NextResponse.json({ ok: true });
    }

    // Parse the message
    const parsed = parseMessage(text);

    // Validate
    const validationError = validateMessage(parsed);
    if (validationError) {
      await sendTelegramMessage(chatId, formatErrorMessage(validationError));
      return NextResponse.json({ ok: true });
    }

    // Handle photo if present
    let imageUrl: string | undefined;
    if (message.photo && message.photo.length > 0) {
      // Get the largest photo (last in array)
      const largestPhoto = message.photo[message.photo.length - 1];

      // Download photo from Telegram
      const photoBuffer = await downloadTelegramPhoto(largestPhoto.file_id);

      if (photoBuffer) {
        // Generate unique filename
        const fileName = `${Date.now()}-${largestPhoto.file_unique_id}.jpg`;

        // Upload to Supabase Storage
        const uploadedUrl = await uploadThoughtImage(photoBuffer, fileName);

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          await sendTelegramMessage(
            chatId,
            formatErrorMessage("No se pudo subir la imagen, pero se guardará el thought sin ella")
          );
        }
      }
    }

    // Create thought in Supabase
    const thought = await createThought({
      title: parsed.title,
      content: parsed.content,
      tags: parsed.tags,
      image_url: imageUrl,
    });

    if (!thought) {
      await sendTelegramMessage(
        chatId,
        formatErrorMessage("No se pudo guardar el thought en la base de datos")
      );
      return NextResponse.json({ ok: true });
    }

    // Send success message
    await sendTelegramMessage(
      chatId,
      formatSuccessMessage(thought.title, thought.slug)
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Telegram sends GET request to verify webhook
export async function GET() {
  return NextResponse.json({ status: "Telegram webhook is active" });
}
