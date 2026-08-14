import { redirect } from "next/navigation";
import { getData } from "@/lib/data/dal"; 
import { PlayerBuildings } from "@/types/game";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredBuilding: string;
}

export default async function RouteGuard({ children, requiredBuilding }: RouteGuardProps) {
  const currentBuildings = await getData<PlayerBuildings>('player_buildings');
  const buildingState = currentBuildings.capital_buildings?.[requiredBuilding];
  if (!buildingState?.isBuilt) {
    redirect('/'); 
  }
  return <>{children}</>;
}