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

export type LoginErrors = {
  detail?: string[];
  phone_number?: string[];
  password?: string[];
};

export type LoginResponseErrorData = {
  errors: LoginErrors;
};

export type RegisterRequestData = {
  password: string;
  password2: string;
  phoneNumber: string;
};

export type RegisterResponseData = {
  data: { status: string };
};

export type RegisterErrors = {
  non_field_errors?: string[];
  password?: string[];
  password2?: string[];
  phone_number?: string[];
};

export type RegisterResponseErrorData = {
  errors: RegisterErrors;
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

export type RegisterVerifyErrors = {
  non_field_errors?: string[];
};

export type RegisterVerifyResponseErrorData = {
  errors: RegisterVerifyErrors;
};

export type RefreshTokenRequestData = {
  refresh: string;
};

export type RefreshTokenResponseData = {
  access: string;
};

export type ResetPasswordRequestData = {
  phone_number: string;
};

export type ResetPasswordResponseData = {
  status: string;
  code_time_to_live: string;
};

export type ResetPasswordErrors = {
  detail: string[];
  phone_number: string[];
};

export type ResetPasswordResponseErrorData = {
  errors: ResetPasswordErrors;
};

export type ResetPasswordVerifyRequestData = {
  phone_number: string;
  code: string;
};

export type ResetPasswordVerifyResponseData = {
  secret_key: string;
};

export type ResetPasswordVerifyErrors = {
  detail: string[];
};

export type ResetPasswordVerifyResponseErrorData = {
  errors: ResetPasswordErrors;
};

export type ResetPasswordSetRequestData = {
  phone_number: string;
  code: string;
  password: string;
  password2: string;
};

export type ResetPasswordSetResponseData = {
  detail: string;
};

export type ResetPasswordSetErrors = {
  password: string[];
  password2: string[];
  non_field_errors: string[];
};

export type ResetPasswordSetResponseErrorData = {
  errors: ResetPasswordSetErrors;
};
