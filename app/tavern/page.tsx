import RouteGuard from "../RouteGuard";

export default function Tavern() {
 
  return (
    <RouteGuard requiredBuilding="tavern">
      <div>
        <h1>Tavern</h1>
      </div>
    </RouteGuard>
  );
}
