export const EVENT_BASE_URL = `/api/event/public`;

export const EVENT = `${EVENT_BASE_URL}`;
export const EVENT_DETAILS = (id: number) => {
  return `${EVENT_BASE_URL}/${id}`;
};

