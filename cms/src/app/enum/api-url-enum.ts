export enum ApiUrlEnum {
  API_URL = 'http://localhost:3000',
  BASE_URL = `http://localhost:3000/api/v1/`,

  MEDIA_PATH = 'http://localhost:3000/',
  BASE_IMAGE_URL = `media/images/`,

  LOGIN = 'account/sign-in',
  SEND_ACTIVATION_LINK = 'account/resend-verification-link',
  SEND_FORGOT_PASSWORD_OTP = 'account/send-forgot-password-otp',
  RESET_PASSWORD = 'account/reset-password',

  ADMIN_LIST = 'admin-user/list',
  ADMIN_MANAGE = 'admin-user/manage',
  ADMIN_MASTER_DATA = 'admin-user/master-data',
  ADMIN_UPDATE_STATUS = 'admin-user/update-status',

  APP_USER_LIST = 'app-user/list',
  APP_USER_UPDATE_STATUS = 'app-user/update-status',
  APP_USER_MANAGE = 'app-user/manage',
  APP_USER_DEVICE_LIST = 'app-user/device-list',
  APP_USER_LOGIN_HISTORY = 'app-user/login-history',

  CURRENT_AFFAIR_LIST = 'current-affair/list',
  CURRENT_AFFAIR = 'current-affair/manage',
  CURRENT_AFFAIR_UPDATE_STATUS = 'current-affair/update-status',
  CURRENT_AFFAIR_APPROVAL_STATUS = 'current-affair/update-approval-status',
  CURRENT_AFFAIR_COMMENT_ALLOW_STATUS = 'current-affair/update-comment-allow-status',

  EVENT_LIST = 'event/list',
  EVENT = 'event/manage',
  EVENT_UPDATE_STATUS = 'event/update-status',
  EVENT_UPDATE_PUBLISHED_STATUS = 'event/update-published-status',

  FAMILY_LIST = 'family/list',
  FAMILY_MANAGE = 'family/manage',
  FAMILY_UPDATE_STATUS = 'family/update-status',
  FAMILY_MASTER = 'family/master-data',
  FAMILY_DETAIL = 'family/detail',
  FAMILY_CONTACT_NUMBER = 'family/contact-info',
  FAMILY_BUSINESS_INFO = 'family/business-info',
  FAMILY_BUSINESS_INFO_FLAG = 'family/update-business-info-status-flag',
  FAMILY_SERVICE_INFO = 'family/service-info',
  FAMILY_SERVICE_INFO_FLAG = 'family/update-service-info-status-flag',
  FAMILY_ADDRESS_INFO = 'family/address-info',
  FAMILY_ADDRESS_INFO_FLAG = 'family/update-address-info-status-flag',

  JOB_LIST = 'job/list',
  JOB_MANAGE = 'job/manage',
  JOB_UPDATE_STATUS = 'job/update-status',

  MATRIMONIAL_LIST = 'matrimonial/list',
  MATRIMONIAL_MANAGE = 'matrimonial/manage',
  MATRIMONIAL_UPDATE_STATUS = 'matrimonial/update-status',

  TEMPLE_LIST = 'temple/list',
  TEMPLE_MANAGE = 'temple/manage',
  TEMPLE_UPDATE_STATUS = 'temple/update-status',

  REPORT_INQUIRY = 'report/inquiry-report',
  REPORT_PUSH_NOTIFICATION = 'report/push-notification-report',

  COUNTRY_LIST = 'lov/country/list',
  COUNTRY_MANAGE = 'lov/country/manage',
  COUNTRY_UPDATE_STATUS = 'lov/country/update-status',

  STATE_LIST = 'lov/state/list',
  STATE_MANAGE = 'lov/state/manage',
  STATE_UPDATE_STATUS = 'lov/state/update-status',

  DISTRICT_LIST = 'lov/district/list',
  DISTRICT_MANAGE = 'lov/district/manage',
  DISTRICT_UPDATE_STATUS = 'lov/district/update-status',

  CITY_VILLAGE_LIST = 'lov/city-village/list',
  CITY_VILLAGE_MANAGE = 'lov/city-village/manage',
  CITY_VILLAGE_UPDATE_STATUS = 'lov/city-village/update-status',

  BUSINESS_LIST = 'lov/business/list',
  BUSINESS_MANAGE = 'lov/business/manage',
  BUSINESS_UPDATE_STATUS = 'lov/business/update-status',

  SERVICE_LIST = 'lov/service/list',
  SERVICE_MANAGE = 'lov/service/manage',
  SERVICE_UPDATE_STATUS = 'lov/service/update-status',

  GENDER_LIST = 'lov/gender/list',
  GENDER_MANAGE = 'lov/gender/manage',
  GENDER_UPDATE_STATUS = 'lov/gender/update-status',

  ADDICTION_LIST = 'lov/addiction/list',
  ADDICTION_MANAGE = 'lov/addiction/manage',
  ADDICTION_UPDATE_STATUS = 'lov/addiction/update-status',

  RELATION_SHIP_LIST = 'lov/relation-ship/list',
  RELATION_SHIP_MANAGE = 'lov/relation-ship/manage',
  RELATION_SHIP_UPDATE_STATUS = 'lov/relation-ship/update-status',

  RELIGION_LIST = 'lov/religion/list',
  RELIGION_MANAGE = 'lov/religion/manage',
  RELIGION_UPDATE_STATUS = 'lov/religion/update-status',

  GOTRA_LIST = 'lov/gotra/list',
  GOTRA_MANAGE = 'lov/gotra/manage',
  GOTRA_UPDATE_STATUS = 'lov/gotra/update-status',

  POST_LIST = 'lov/post/list',
  POST_MANAGE = 'lov/post/manage',
  POST_UPDATE_STATUS = 'lov/post/update-status',

  JOB_TYPE_LIST = 'lov/job-type/list',
  JOB_TYPE_MANAGE = 'lov/job-type/manage',
  JOB_TYPE_UPDATE_STATUS = 'lov/job-type/update-status',

  JOB_CATEGORY_LIST = 'lov/job-category/list',
  JOB_CATEGORY_MANAGE = 'lov/job-category/manage',
  JOB_CATEGORY_UPDATE_STATUS = 'lov/job-category/update-status',

  JOB_SUB_CATEGORY_LIST = 'lov/job-sub-category/list',
  JOB_SUB_CATEGORY_MANAGE = 'lov/job-sub-category/manage',
  JOB_SUB_CATEGORY_UPDATE_STATUS = 'lov/job-sub-category/update-status',

  FAQ_CATEGORY_LIST = 'lov/faq-category/list',
  FAQ_CATEGORY_MANAGE = 'lov/faq-category/manage',
  FAQ_CATEGORY_UPDATE_STATUS = 'lov/faq-category/update-status',

  LEGAL_PAGE_LIST = 'legal-page/list',
  LEGAL_PAGE_MANAGE = 'legal-page/manage',
  LEGAL_PAGE_UPDATE_STATUS = 'legal-page/update-status',

  CONFIG_PARAMETER_LIST = 'misc/config-parameter-list',
  CONFIG_PARAMETER_MANAGE = 'misc/config-parameter-manage',
  CONFIG_PARAMETER_UPDATE_STATUS = 'misc/config-parameter-update-status',

  FAQ_LIST = 'faq/list',
  FAQ_MANAGE = 'faq/manage',
  FAQ_UPDATE_STATUS = 'faq/update-status',

  MANDAL_LIST = 'mandal/list',
  MANDAL_MANAGE = 'mandal/manage',
  MANDAL_UPDATE_STATUS = 'mandal/update-status',

  MANDAL_MEMBER_LIST = 'mandal/mandal-member/LIST',
  MANDAL_MEMBER_MANAGE = 'mandal/manage-mandal-member',
  MANDAL_MEMBER_UPDATE_STATUS = 'mandal/manage-mandal-update-status',

  TRUSTEE_LIST = 'trustee/list',
  TRUSTEE_MANAGE = 'trustee/manage',
  TRUSTEE_UPDATE_STATUS = 'trustee/update-status',

  ADDRESS_MASTER = 'common/address-master',
  CONTACT_NUMBER_MASTER = 'common/contact-number-master',

  MEDIA_UPLOAD = 'common/media/upload-media',
  SEARCH_USER = 'common/search-user',
}
