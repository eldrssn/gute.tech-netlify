import { createAsyncThunk } from '@reduxjs/toolkit';

// import { store } from 'store';
// import { logOut } from 'store/reducers/authentication/exceptionAction';
// import { getCookie, setCookie } from 'utility/helpers';
// import { CookieKey } from 'constants/types';
// import { apiАuthentication } from 'api/utils';
// import { refreshToken } from 'api/routes/authentication';

import { CreateAsyncActionProps } from './types';

const createAsyncAction = <ResponseData, RequestData = never>({
  typeAction,
  request,
  shouldHandleError = false, // завершившийся с ошибкой промис возвращает данные из payload`a неудачного запроса
  shouldReturnRequestData = false, // данные необходимые для запроса возвращаются вместе с полученными после запроса
  onFulfilled, // функция, вызов который происходит при успешном запросе
}: CreateAsyncActionProps<ResponseData, RequestData>) =>
  createAsyncThunk(
    typeAction,
    async (requestData: RequestData, { rejectWithValue }) => {
      try {
        const data = await request(requestData);

        if (onFulfilled) {
          onFulfilled(data);
        }

        return shouldReturnRequestData
          ? { requestData: requestData, data: data }
          : data;
      } catch (error) {
        // const originalRequest = error.config;
        // const refresh = getCookie(CookieKey.REFRESH_TOKEN);

        // if (error.response.status == 401 && !error.config._isRetry && refresh) {
        //   originalRequest._isRetry = true;
        //   try {
        //     const response = await refreshToken({ refresh });
        //     setCookie(CookieKey.ACCESS_TOKEN, response.access);

        //     return apiАuthentication
        //       .request(originalRequest)
        //       .then<ResponseData>((response) => response.data);
        //   } catch {
        //     store.dispatch(logOut());
        //     throw error;
        //   }
        // }

        if (!error.response) {
          throw error;
        }

        if (shouldHandleError) {
          return rejectWithValue(error.response.data);
        }

        throw error;
      }
    },
  );

export { createAsyncAction };
