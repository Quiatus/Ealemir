import { supabase } from "@/lib/supabase";
import { PlayerBuildings } from "@/types/game";
import { cache } from "react";

export const getPlayerBuildings = cache(async function(): Promise<PlayerBuildings> {
  const { data, error } = await supabase
    .from("player_buildings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch player resources");
  }

  return data as PlayerBuildings;
})