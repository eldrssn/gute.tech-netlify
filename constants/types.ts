enum EValidatePattern {
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email',
}

enum CookieKey {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
  SELECTEDCITY = 'selectedCity',
  CARTITEMS = 'cartItems',
  TRANSPORT_ID = 'transportId',
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
