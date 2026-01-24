import { ParsedThought } from "@/types/thought";

export function parseMessage(text: string): ParsedThought {
  const lines = text.trim().split("\n");

  if (lines.length === 0) {
    return { title: "", content: "", tags: [] };
  }

  // First line is the title
  const title = lines[0].trim();

  // Extract hashtags from the entire message
  const hashtagRegex = /#(\w+)/g;
  const tags: string[] = [];
  let match;

  while ((match = hashtagRegex.exec(text)) !== null) {
    tags.push(match[1].toLowerCase());
  }

  // Content is everything except the first line, with hashtags removed
  let content = lines
    .slice(1)
    .join("\n")
    .replace(/#\w+/g, "")
    .trim();

  // If no content provided, use title as content
  if (!content) {
    content = title;
  }

  return { title, content, tags };
}

export function validateMessage(parsed: ParsedThought): string | null {
  if (!parsed.title || parsed.title.length === 0) {
    return "El mensaje debe tener al menos un título (primera línea)";
  }

  if (parsed.title.length > 500) {
    return "El título es muy largo (máximo 500 caracteres)";
  }

  return null;
}
