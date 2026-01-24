import slugify from "slugify";

export function generateSlug(title: string): string {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  const timestamp = Date.now().toString(36);
  return `${baseSlug}-${timestamp}`;
}
