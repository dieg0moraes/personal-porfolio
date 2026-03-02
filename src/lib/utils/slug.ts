export function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  return timestamp;
}
