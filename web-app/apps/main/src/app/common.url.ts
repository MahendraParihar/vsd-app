export const CORE_BASE_URL = `/api/core`;

export const MISC_PAGE = (page: string) => {
  return `${CORE_BASE_URL}/page/public/${page}`;
};

