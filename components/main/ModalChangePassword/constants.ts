import { TFormData } from './types';

const MIN_LENGTH = 8;
const modalFields: Record<string, keyof TFormData> = {
  NEW_PASSWORD: 'newPassword',
  REPEAT_NEW_PASSWORD: 'repeatNewPassword',
  CURRENT_PASSWORD: 'currentPassword',
};

const passwordRule = {
  required: {
    value: true,
    message: 'Поле обязательно',
  },
  minLength: {
    value: MIN_LENGTH,
    message: 'Пароль должен состоять минимум из 8 символов',
  },
};

export { modalFields, passwordRule };
