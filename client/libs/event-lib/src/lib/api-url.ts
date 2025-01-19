const BASE_URL = '/api/event';

export enum EventApiUrl {
  EVENT = `${BASE_URL}`,
  EVENT_STATUS = `${BASE_URL}/status`,
  MANAGE_EVENT = `${BASE_URL}/manage`,
}
