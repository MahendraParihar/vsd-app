export const EVENT_BASE_URL = `/api/event/public`;

export const EVENT = `${EVENT_BASE_URL}`;
export const EVENT_DETAILS = (url: string) => {
  return `${EVENT_BASE_URL}/${url}`;
};
export const UPCOMING_EVENTS = `${EVENT_BASE_URL}/upcoming-event`;

