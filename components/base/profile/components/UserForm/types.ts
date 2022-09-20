import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
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
  city?: { title?: boolean | undefined; slug?: boolean | undefined };
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
  city?: {
    title?: FieldError | undefined;
    slug?: FieldError | undefined;
    message?: string;
  };
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
  setValue: UseFormSetValue<ProfileResponseData>;
};

type AccountFieldsProps = PersonalFieldsProps & {
  setValue: UseFormSetValue<ProfileResponseData>;
};

type TDate = Date | null | undefined;

type DatepickerProps = {
  getValues: UseFormGetValues<ProfileResponseData>;
  errors: TErrors;
  register: UseFormRegister<ProfileResponseData>;
  setValue: UseFormSetValue<ProfileResponseData>;
  onChangeForm: () => Promise<void>;
};

type CitySelectProps = {
  getValues: UseFormGetValues<ProfileResponseData>;
  setValue: UseFormSetValue<ProfileResponseData>;
  onChangeForm: () => Promise<void>;
};

export type {
  TDate,
  TErrors,
  TFormDataFields,
  PersonalFieldsProps,
  AccountFieldsProps,
  TDirtyFields,
  DatepickerProps,
  CitySelectProps,
};
