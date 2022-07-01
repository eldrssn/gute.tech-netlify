type TFormData = {
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
  code: string;
};

enum FormKey {
  PHONE_NUMBER = 'phoneNumber',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export { FormKey };
export type { TFormData };
