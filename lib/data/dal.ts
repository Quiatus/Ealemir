import { supabase } from "@/lib/supabase";
import { cache } from "react";

export const getData = cache(async function <T>(tableName: string): Promise<T> {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch player resources");
  }

  return data as T;
})