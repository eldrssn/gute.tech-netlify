import {
  Control,
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

type CityData = { title: string; slug: string };

type FormData = {
  last_name: string;
  first_name: string;
  patronymic: string;
  phone_number: string;
  date_of_birthday: Date | null;
  email: string;
  date_joined: string;
  transport: string;
  city: CityData;
};

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

type TFormDataFields = keyof FormData;

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
  register: UseFormRegister<FormData>;
  onChangeForm: () => Promise<void>;
  errors: TErrors;
  getValues: UseFormGetValues<FormData>;
  handleChangeFormValue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TFormDataFields,
  ) => void;
  setValue: UseFormSetValue<FormData>;
};

type AccountFieldsProps = PersonalFieldsProps & {
  setValue: UseFormSetValue<FormData>;
  control: Control<FormData>;
};

type TDate = Date | null | undefined;

type DatepickerProps = {
  getValues: UseFormGetValues<FormData>;
  errors: TErrors;
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  onChangeForm: () => Promise<void>;
};

type CitySelectProps = {
  getValues: UseFormGetValues<FormData>;
  setValue: UseFormSetValue<FormData>;
  onChangeForm: () => Promise<void>;
};

export type {
  TDate,
  TErrors,
  FormData,
  TFormDataFields,
  PersonalFieldsProps,
  AccountFieldsProps,
  TDirtyFields,
  DatepickerProps,
  CitySelectProps,
};
