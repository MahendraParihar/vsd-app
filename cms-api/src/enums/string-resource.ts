export enum StringResource {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SOMETHING_WENT_WRONG = 'Something went wrong, please try again',
  SUCCESS = 'Success',

  NO_DATA_FOUND = 'No data found for selected search filter',

  // region Account
  ADMIN_INACTIVE = 'This user id is in actived by super admin',
  INVALID_USER = 'user id and password not matched',
  PENDING_FOR_ADMIN_VERIFICATION = 'Admin verification still in progress, once we verify your account details, you will able to login',
  SUCCESS_ACCOUNT_VERIFICATION = 'Your account is verify successfully, now you can login with login details',
  ACCOUNT_ALREADY_PRESENT = 'this email Id and contact number is already present in system, different Email ID or contact number',
  ACCOUNT_NOT_PRESENT = 'Account not present',
  INVALID_VERIFICATION_CODE = 'Invalid verification code',
  ACCOUNT_ALREADY_ACTIVE = 'Your account is already active, please login',
  SUCCESS_VERIFICATION_CODE_SENT = 'Verification link sent successfully to your email ID',
  ACOUNT_NOT_VERIFIED = 'Your email id still not verified, please verify your email ID',
  REPEAT_PASSWORD_NOT_MATCH = 'Password and repeat password not matched',
  INVALID_OTP = 'Otp is invalid or expired',
  // endregion

  // region event
  NO_EVENT_FOUND = 'No event found for selected search filter',
  // endregion

  // region family
  NO_FAMILY_FOUND = 'No family found for selected search filter',
  CONTACT_NUMBER_ALREADY_PRESENT = 'Given contact number is already register with us.',
  // endregion

  // region misc
  NO_MANDAL_FOUND = 'No mandal found',
  NO_MANDAL_MEMBER_FOUND = 'No mandal member found',
  NO_TRUSTEE_FOUND = 'No trustee found',
  NO_TEMPLE_FOUND = 'No temple found',
  NO_FAQ_FOUND = 'No faq found',
  NO_LEGAL_PAGE_FOUND = 'Legal page not found',
  // endregion

  // region current affair
  NO_CURRENT_AFFAIR_FOUND = 'No current affair found for selected search filter',
  // endregion

  IN_ACTIVE = 0
}
