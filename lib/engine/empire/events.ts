import { randomRange, text } from "@/lib/utilities";
import { ActiveOngoingEvent, DynamicWeightContext, GameEventConfig, PlayerEmpire } from "@/types/game";
import { PlayerResources } from '@/types/game';

export function rollEventCount(): number {
  const roll = Math.random();

  if (roll < 0.65) return 0;
  if (roll < 0.80) return 1;
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

export function calculateTurnEvents(allEvents: GameEventConfig[], resources: PlayerResources, currentEmpire: PlayerEmpire, capitalLevel: number) {
  const instantEventsLog: string[] = [];
  const ongoingEventsLog: string[] = [];  
  const nextActiveOngoing: ActiveOngoingEvent[] = [];
  const eventResourceChanges: Partial<Record<keyof PlayerResources, number>> = {};
  let amount = 0
  let duration = 0
  
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

  const eventCount = rollEventCount();
  const activeIds = new Set(nextActiveOngoing.map(e => e.event.id));
  const eligibleEvents = eventCount > 0 ? allEvents.filter(e => isEventEligible(e, { turn: resources.turn, fame: resources.fame, capitalLevel, activeIds })) : [];
  const triggeredEvents = pickWeightedEvents(eligibleEvents, eventCount);

  for (const event of triggeredEvents) {
    if (event.type === 'ongoing' && event.duration) {
      duration = randomRange(event.duration.min, event.duration.max);
      ongoingEventsLog.push(text(event.description, {duration}))
      nextActiveOngoing.push({ event, turnsRemaining: duration });
    }

    if (event.effects.resources) {
      for (const [resKey, range] of Object.entries(event.effects.resources)) {
        if (range) {
          amount = randomRange(range.min, range.max);
          eventResourceChanges[resKey as keyof PlayerResources] = (eventResourceChanges[resKey as keyof PlayerResources] || 0) + amount;
          instantEventsLog.push(text(event.description, {amount}))
        }
      }
    }
  }

  return {
    eventResourceChanges,
    updatedEmpire: {
      ...currentEmpire,
      active_events: nextActiveOngoing
    },
    instantEventsLog,
    ongoingEventsLog
  };
}