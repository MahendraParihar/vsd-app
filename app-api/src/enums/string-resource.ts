export enum StringResource {
    SOMETHING_WENT_WRONG = 'Something went wrong, please try again',
    SUCCESS = 'Success',

    // region Account
    PENDING_FOR_ADMIN_VERIFICATION = 'Admin verification still in progress, once we verify your account details, you will able to login',
    SUCCESS_OTP_VERIFICATION = 'Your account is verify successfully, now our admin will verify you account and give you rights to access application',
    ACCOUNT_IN_ACTIVE = 'this user is marked as in-active, please contact administration',
    ACCOUNT_ALREADY_PRESENT = 'this email Id and contact number is already present in system, different Email ID or contact number',
    ACCOUNT_NOT_PRESENT = 'Account not present',
    INVALID_VERIFICATION_CODE = 'Invalid verification code',
    ACCOUNT_ALREADY_ACTIVE = 'Your account is already active, please login',
    SUCCESS_VERIFICATION_CODE_SENT = 'OTP sent successfully to your user id',
    // endregion

    // region event
        NO_EVENT_FOUND = 'No event found for selected search filter',
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