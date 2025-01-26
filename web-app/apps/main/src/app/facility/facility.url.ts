export const FACILITY_BASE_URL = `/api/facility/public`;

export const FACILITY_LIST = `${FACILITY_BASE_URL}`;
export const FACILITY_DETAILS = (url: string) => {
  return `${FACILITY_BASE_URL}/${url}`;
};

