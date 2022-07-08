import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

import { ProfileResponseData } from 'api/models/user';

type TDirtyFields = {
  last_name?: boolean | undefined;
  first_name?: boolean | undefined;
  patronymic?: boolean | undefined;
  phone_number?: boolean | undefined;
  date_of_birthday?: boolean | undefined;
  email?: boolean | undefined;
  date_joined?: boolean | undefined;
  transport?: boolean | undefined;
};

type TFormDataFields = keyof ProfileResponseData;

type TErrors = {
  last_name?: FieldError | undefined;
  first_name?: FieldError | undefined;
  patronymic?: FieldError | undefined;
  phone_number?: FieldError | undefined;
  date_of_birthday?: FieldError | undefined;
  email?: FieldError | undefined;
  date_joined?: FieldError | undefined;
  transport?: FieldError | undefined;
};

type PersonalFieldsProps = {
  register: UseFormRegister<ProfileResponseData>;
  onChangeForm: () => Promise<void>;
  errors: TErrors;
  getValues: UseFormGetValues<ProfileResponseData>;
  handleChangeFormValue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TFormDataFields,
  ) => void;
};

type AccountFieldsProps = PersonalFieldsProps & {
  setValue: UseFormSetValue<ProfileResponseData>;
  trigger: UseFormTrigger<ProfileResponseData>;
  handleOpenModalEmail: () => void;
};

type TDate = Date | null | undefined;

export type {
  TDate,
  TFormDataFields,
  PersonalFieldsProps,
  AccountFieldsProps,
  TDirtyFields,
};
