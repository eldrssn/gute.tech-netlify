type TFormData = {
  username?: string;
  password?: string;
  last_name?: string;
  first_name?: string;
  patronymic?: string;
  phone_number?: string;
  date_of_birthday?: Date | null;
  email?: string;
  date_joined?: Date;
  transport?: string;
  sex?: string;
  city?: string;
  country?: string;
};

type TFormDataFields = keyof TFormData;

type TDate = Date | null | undefined;

export type { TFormData, TDate, TFormDataFields };
