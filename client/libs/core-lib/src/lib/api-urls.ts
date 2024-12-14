const BASE_URL = '/api/core/';

export enum ApiUrls {
  GET_ALL_LABELS = `${BASE_URL}label/admin`,
  LOGIN = `${BASE_URL}account/sign-in`,
  ADDRESS_MASTER_DATA = `${BASE_URL}address/master-data`,
  MEDIA_PATH = `http://localhost:3000` + '/',
  MEDIA_UPLOAD = `${BASE_URL}media/upload-media`,
}
