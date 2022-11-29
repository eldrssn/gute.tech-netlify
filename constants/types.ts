enum EValidatePattern {
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email',
}

enum CookieKey {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
  NOT_AUTHORIZED_TOKEN = 'notAuthorizedToken',
  SELECTEDCITY = 'selectedCity',
  CART_ITEMS = 'cartItems',
  TRANSPORT_ID = 'transportId',
  TRANSPORT_YEAR = 'transportYear',
  SELECTED_CITY = 'selectedCity',
  SELECTED_BRANCH_ID = 'selectedBranchId',
  FIRST_CHANGE_CITY = 'firstChageCity',
}

enum LocalStorageKey {
  TOKEN = 'token',
}

enum CookieSameSite {
  NONE = 'None',
  LAX = 'Lax',
  STRICT = 'Strict',
}

enum ActiveAutorizationFormKey {
  AUTHORIZATION = 'authorization',
  REGISTRATION = 'registration',
  REGISTRATION_VERIFICATION = 'registrationVerification',
  RESET_PASSWORD = 'resetPassword',
  RESET_PASSWORD_VERIFY = 'resetPasswodReset',
  RESET_PASSWORD_SET = 'resetPasswordSet',
  RESET_PASSWORD_SUCCESS = 'resetPasswordSuccess',
}

enum ApiMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

export {
  ApiMethods,
  EValidatePattern,
  CookieKey,
  LocalStorageKey,
  CookieSameSite,
  ActiveAutorizationFormKey,
};
