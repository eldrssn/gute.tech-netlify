import { sendRequest } from '../utils';
import {
  LoginRequestData,
  LoginResponseData,
  RegisterRequestData,
  RegisterResponseData,
  RegisterVerifyRequestData,
  RegisterVerifyRetryRequestData,
  RegisterVerifyResponseData,
  RefreshTokenRequestData,
  RefreshTokenResponseData,
  ResetPasswordRequestData,
  ResetPasswordResponseData,
  ResetPasswordVerifyRequestData,
  ResetPasswordVerifyResponseData,
  ResetPasswordSetRequestData,
  ResetPasswordSetResponseData,
} from 'api/models/authentication';
import { ApiMethods } from 'constants/types';

const postLogin = ({ phoneNumber, password }: LoginRequestData) =>
  sendRequest<LoginResponseData>({
    url: `/user/login/`,
    method: ApiMethods.POST,
    config: {
      data: {
        phone_number: phoneNumber,
        password,
      },
    },
  });

const postRegistration = ({
  phoneNumber,
  password2,
  password,
}: RegisterRequestData) =>
  sendRequest<RegisterResponseData>({
    url: `/user/register/`,
    method: ApiMethods.POST,
    config: {
      data: {
        password,
        password2,
        phone_number: phoneNumber,
      },
    },
  });

const postRegistrationVerify = ({
  phoneNumber,
  code,
}: RegisterVerifyRequestData) =>
  sendRequest<RegisterVerifyResponseData>({
    url: `/user/register/verify/`,
    method: ApiMethods.POST,
    config: {
      data: {
        code,
        phone_number: phoneNumber,
      },
    },
  });

const postRegistrationVerifyRetry = ({
  phoneNumber,
}: RegisterVerifyRetryRequestData) =>
  sendRequest<RegisterVerifyResponseData>({
    url: `/user/register/verify/retry/`,
    method: ApiMethods.POST,
    config: {
      data: {
        phone_number: phoneNumber,
      },
    },
  });

const refreshToken = async ({ refresh }: RefreshTokenRequestData) =>
  sendRequest<RefreshTokenResponseData>({
    url: `/user/token/refresh/`,
    method: ApiMethods.POST,
    config: {
      data: {
        refresh,
      },
    },
  });

const postResetPasswordRequest = ({ phone_number }: ResetPasswordRequestData) =>
  sendRequest<ResetPasswordResponseData>({
    url: `/user/reset_password_request/`,
    method: ApiMethods.POST,
    config: {
      data: {
        phone_number,
      },
    },
  });

const postResetPasswordVerify = ({
  phone_number,
  code,
}: ResetPasswordVerifyRequestData) =>
  sendRequest<ResetPasswordVerifyResponseData>({
    url: `/user/reset_password_verify/`,
    method: ApiMethods.POST,
    config: {
      data: {
        phone_number,
        code,
      },
    },
  });

const putResetPassword = ({
  phone_number,
  code,
  password,
  password2,
}: ResetPasswordSetRequestData) =>
  sendRequest<ResetPasswordSetResponseData>({
    url: `/user/reset_password/`,
    method: ApiMethods.PUT,
    config: {
      data: {
        phone_number,
        secret_key: code,
        password,
        password2,
      },
    },
  });

export {
  putResetPassword,
  postLogin,
  refreshToken,
  postRegistration,
  postRegistrationVerify,
  postRegistrationVerifyRetry,
  postResetPasswordRequest,
  postResetPasswordVerify,
};
