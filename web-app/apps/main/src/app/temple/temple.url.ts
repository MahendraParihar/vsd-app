export const TEMPLE_BASE_URL = `/api/temple/public`;

export const TEMPLE = `${TEMPLE_BASE_URL}`;
export const TEMPLE_DETAILS = (url: string) => {
  return `${TEMPLE_BASE_URL}/${url}`;
};

