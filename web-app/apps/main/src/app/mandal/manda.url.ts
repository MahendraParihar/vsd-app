export const MANDAL_BASE_URL = `/api/mandal/public`;

export const MANDAL_LIST = `${MANDAL_BASE_URL}`;
export const PRIMARY_MANDAL_DETAILS = `${MANDAL_BASE_URL}`;
export const MANDAL_DETAILS = (url: string) => {
  return `${MANDAL_BASE_URL}/${url}`;
};

