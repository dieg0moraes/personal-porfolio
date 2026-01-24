import { getSupabase, getSupabaseAdmin } from "./client";
import { Thought, CreateThoughtInput } from "@/types/thought";
import { generateSlug } from "@/lib/utils/slug";

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
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating thought:", error);
    return null;
  }

  return data;
}

export async function updateThoughtXPost(
  id: string,
  xPostId: string
): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("Supabase admin client not available");
    return false;
  }

  const { error } = await supabaseAdmin
    .from("thoughts")
    .update({
      posted_to_x: true,
      x_post_id: xPostId,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating thought X post:", error);
    return false;
  }

  return true;
}
