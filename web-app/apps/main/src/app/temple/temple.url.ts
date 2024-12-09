export const TEMPLE_BASE_URL = `/api/temple/public`;

export const TEMPLE = `${TEMPLE_BASE_URL}`;
export const TEMPLE_DETAILS = (id: number) => {
  return `${TEMPLE_BASE_URL}/${id}`;
};

