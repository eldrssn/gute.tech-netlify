import { getProfile } from 'api/routes/user';
import { ProfileResponseData } from 'api/models/user';
import { createAsyncAction } from 'utility/helpers/store';

const fetchProfile = createAsyncAction<ProfileResponseData>({
  typeAction: 'user/fetchProfile',
  request: getProfile,
  shouldHandleError: true,
});

export { fetchProfile };

//TODO: удалить после теста со всех редьюсеров

// const fetchProfile = createAsyncThunk('user/fetchProfile', async () => {
//   const data = await getProfile();

//   return data;
// });
