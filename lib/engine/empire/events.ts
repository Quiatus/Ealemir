import { randomRange, text } from "@/lib/utilities";
import { ActiveOngoingEvent, DynamicWeightContext, GameEventConfig, PlayerEmpire } from "@/types/game";
import { PlayerResources } from '@/types/game';

export function rollEventCount(): number {
  const roll = Math.random();

  if (roll < 0.60) return 0;
  if (roll < 0.85) return 1;
  if (roll < 0.95) return 2;
  return 3;
}

export function isEventEligible(event: GameEventConfig, context: DynamicWeightContext & { activeIds: Set<string> }): boolean {
  if (context.activeIds.has(event.id) || event.exclusiveEventIds?.some(item => context.activeIds.has(item))) return false;
  
  if (event.conditions?.minTurn && context.turn < event.conditions.minTurn) return false;
  if (event.conditions?.maxTurn && context.turn > event.conditions.maxTurn) return false;

  if (event.conditions?.minFame && context.fame < event.conditions.minFame) return false;
  if (event.conditions?.minCapitalLevel && context.capitalLevel < event.conditions.minCapitalLevel) return false;

  return true;
}

export function pickWeightedEvents(eligiblePool: GameEventConfig[], count: number): GameEventConfig[] {
  if (eligiblePool.length <= count) {
    return [...eligiblePool];
  }

  const selectedEvents: GameEventConfig[] = [];
  const candidatePool = [...eligiblePool];

  for (let i = 0; i < count; i++) {
    const totalWeight = candidatePool.reduce((sum, evt) => sum + Math.max(1, Math.min(100, evt.rarity)), 0);
    
    let roll = Math.random() * totalWeight;
    let chosenIndex = 0;

    for (let j = 0; j < candidatePool.length; j++) {
      roll -= candidatePool[j].rarity;
      if (roll <= 0) {
        chosenIndex = j;
        break;
      }
    }

    selectedEvents.push(candidatePool[chosenIndex]);
    candidatePool.splice(chosenIndex, 1);
  }

  return selectedEvents;
}

// export function processTurnEvents(
//   allEvents: GameEventConfig[],
//   context: { turn: number; fame: number; capitalLevel: number; activeIds: Set<string> }
// ): GameEventConfig[] {
//   const eventCount = rollEventCount();
//   if (eventCount === 0) return [];

//   const eligiblePool = allEvents.filter(event => isEventEligible(event, context));
//   if (eligiblePool.length === 0) return [];

//   return pickWeightedEvents(eligiblePool, eventCount);
// }

export function calculateTurnEvents(allEvents: GameEventConfig[], resources: PlayerResources, currentEmpire: PlayerEmpire, capitalLevel: number) {
  const updatedResources = { ...resources };
  const instantEventsLog: string[] = [];
  const ongoingEventsLog: string[] = [];
  let amount = 0
  let duration = 0

  // 1. Tick down and filter ongoing events
  const nextActiveOngoing: ActiveOngoingEvent[] = [];

  const activeEvents = currentEmpire.active_events || [];

  activeEvents.forEach(active => {
    if (active.turnsRemaining > 1) {
      ongoingEventsLog.push(text(active.event.description, {duration: active.turnsRemaining - 1}))
      nextActiveOngoing.push({
        ...active,
        turnsRemaining: active.turnsRemaining - 1
      });
    }
  });

  // 2. Roll & trigger new events
  const activeIds = new Set(nextActiveOngoing.map(e => e.event.id));
  const eventCount = rollEventCount();
  
  const eligibleEvents = eventCount > 0 ? allEvents.filter(e => isEventEligible(e, { turn: resources.turn, fame: resources.fame, capitalLevel, activeIds })) : [];

  const triggeredEvents = pickWeightedEvents(eligibleEvents, eventCount);
 // const nextDiscoveredLocations = [...eventsState.discoveredLocations];

  // 3. Process effects of newly triggered events
  for (const event of triggeredEvents) {

    if (event.type === 'ongoing' && event.duration) {
      duration = randomRange(event.duration.min, event.duration.max);
      ongoingEventsLog.push(text(event.description, {duration}))
      nextActiveOngoing.push({
        event,
        turnsRemaining: duration
      });
    }
    // One-off resource grants/penalties
    if (event.effects.resources) {
      for (const [resKey, range] of Object.entries(event.effects.resources)) {
        if (range && updatedResources[resKey as keyof PlayerResources] !== undefined) { 
          amount = randomRange(range.min, range.max);
          (updatedResources[resKey as keyof PlayerResources] as number) += amount;
          instantEventsLog.push(text(event.description, {amount}))
        }
      }
    }

    // Encounters / Locations to conquer
    // if (event.effects.unlockLocationId && !nextDiscoveredLocations.includes(event.effects.unlockLocationId)) {
    //   nextDiscoveredLocations.push(event.effects.unlockLocationId);
    // }

    // Ongoing events queue
  }

  // 4. Aggregate active modifiers for the economy engine
  // const activeModifiers: Record<string, number> = {};
  // const activeConfigMap = new Map(allEvents.map(e => [e.id, e]));

  // for (const active of nextActiveOngoing) {
  //   const config = activeConfigMap.get(active.eventId);
  //   if (config?.effects.modifiers) {
  //     for (const [key, modValue] of Object.entries(config.effects.modifiers)) {
  //       activeModifiers[key] = (activeModifiers[key] ?? 0) + modValue;
  //     }
  //   }
  // }

  return {
    updatedResources,
    updatedEmpire: {
      ...currentEmpire,
      active_events: nextActiveOngoing
    },
    instantEventsLog,
    ongoingEventsLog
  };
}