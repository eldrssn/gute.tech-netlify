export type LoginRequestData = {
  phoneNumber: string;
  password: string;
};

export type LoginResponseData = {
  refresh: string;
  access: string;
  detail: string;
  phone_number: string;
  password: string;
};

export type LoginResponseErrorData = {
  detail?: string;
  phone_number?: string;
  password?: string;
};

export type RegisterRequestData = {
  password: string;
  password2: string;
  phoneNumber: string;
};

export type RegisterResponseData = {
  status: string;
};

export type RegisterResponseErrorData = {
  non_field_errors?: string;
  password?: string;
  password2?: string;
  phone_number?: string;
};

export type RegisterVerifyRequestData = {
  phoneNumber: string;
  code: string;
};

export type RegisterVerifyRetryRequestData = {
  phoneNumber: string;
};

export type RegisterVerifyResponseData = {
  status?: string;
};

export type RegisterVerifyResponseErrorData = {
  non_field_errors?: string;
};

export type RefreshTokenRequestData = {
  refresh: string;
};

export type RefreshTokenResponseData = {
  access: string;
};
