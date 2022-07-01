type Props = {
  isOpen: boolean;
};

type TFormData = {
  phoneNumber: string;
  password: string;
};

enum FormKey {
  PHONE_NUMBER = 'phoneNumber',
  PASSWORD = 'password',
}

export { FormKey };
export type { TFormData, Props };
