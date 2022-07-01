import { sendRequestАuthentication } from '../utils';
import { ProfileResponseData } from 'api/models/user';
import { ApiMethods } from 'constants/types';

const getProfile = () =>
  sendRequestАuthentication<ProfileResponseData>({
    url: `/user/profile/`,
    method: ApiMethods.GET,
  });

export { getProfile };
