import { NextRequest, NextResponse } from "next/server";
import { TelegramUpdate } from "@/types/thought";
import { parseMessage, validateMessage } from "@/lib/telegram/parser";
import {
  sendTelegramMessage,
  formatSuccessMessage,
  formatErrorMessage,
} from "@/lib/telegram/bot";
import { createThought } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json();

    // Ignore non-message updates
    if (!update.message?.text) {
      return NextResponse.json({ ok: true });
    }

    const message = update.message;
    const text = message.text as string; // Already validated above
    const chatId = message.chat.id;
    const userId = message.from.id;

    // Verify user is authorized
    const allowedUserId = process.env.TELEGRAM_ALLOWED_USER_ID;
    if (allowedUserId && userId.toString() !== allowedUserId) {
      console.log(`Unauthorized user: ${userId}`);
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

    // Create thought in Supabase
    const thought = await createThought({
      title: parsed.title,
      content: parsed.content,
      tags: parsed.tags,
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
