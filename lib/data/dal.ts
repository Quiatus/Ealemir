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

export async function updateData<T>(tableName: string, data: Partial<T>): Promise<T> {
  const { data: updatedRow, error } = await supabase
    .from(tableName)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update(data as any)
    .eq("id", 1)
    .select() 
    .single();

  if (error) {
    throw new Error(`Failed to update ${tableName}`); 
  }

  return updatedRow as T;
}
