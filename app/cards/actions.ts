"use server";

import { Tables } from "@/types/supabase";
import { createClient as createSupabaseClient } from "@/utils/supabase/server";

export async function getCardsFromUser(userId: Tables<"users">["id"]) {
  const supabase = createSupabaseClient();

  return supabase
    .from("cards")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false })
    .eq("user_id", userId);
}
