import { getSupabase, getSupabaseAdmin } from "./client";
import { Thought, CreateThoughtInput } from "@/types/thought";
import { generateSlug } from "@/lib/utils/slug";

const STORAGE_BUCKET = "thought-images";

export async function uploadThoughtImage(
  imageBuffer: Buffer,
  fileName: string
): Promise<string | null> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("Supabase admin client not available");
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, imageBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading thought image:", error);
    return null;
  }
}

export async function getThoughts(): Promise<Thought[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching thoughts:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Supabase not configured:", error);
    return [];
  }
}

export async function getThoughtBySlug(slug: string): Promise<Thought | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("thoughts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      console.error("Error fetching thought:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Supabase not configured:", error);
    return null;
  }
}

export async function createThought(
  input: CreateThoughtInput
): Promise<Thought | null> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("Supabase admin client not available");
    return null;
  }

  const slug = generateSlug(input.title);

  const { data, error } = await supabaseAdmin
    .from("thoughts")
    .insert({
      slug,
      title: input.title,
      content: input.content,
      tags: input.tags || [],
      image_url: input.image_url || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating thought:", error);
    return null;
  }

  return data;
}

