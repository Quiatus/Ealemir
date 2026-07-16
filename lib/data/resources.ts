import { supabase } from "@/lib/supabase";
import { PlayerResources } from "@/types/game";
import { cache } from "react";

export const getPlayerResources = cache(async function(): Promise<PlayerResources> {
  const { data, error } = await supabase
    .from("player_resources")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch player resources");
  }

  return data as PlayerResources;
})