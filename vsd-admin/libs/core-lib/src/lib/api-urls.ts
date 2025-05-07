const BASE_URL = '/api/core/';
const LOV_BASE_URL = '/api/lov/';
const FAMILY_BASE_URL = '/api/family';

export enum ApiUrls {
  GET_ALL_LABELS = `${BASE_URL}label/admin`,
  LOGIN = `${BASE_URL}account/sign-in`,
  REFRESH_TOKEN = `${BASE_URL}account/refresh-token`,
  CHANGE_PASSWORD = `${BASE_URL}account/change-password`,
  PROFILE = `${BASE_URL}account/profile`,
  ADDRESS_MASTER_DATA = `${BASE_URL}address/master-data`,
  MEDIA_PATH = `http://localhost:3000` + '/',
  MEDIA_UPLOAD = `${BASE_URL}media/upload-media`,
  POST = `${LOV_BASE_URL}post`,
  FAMILY = `${FAMILY_BASE_URL}/search`,
}
