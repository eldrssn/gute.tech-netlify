type TFormData = {
  password: string;
  passwordRepeat: string;
};

enum FormKey {
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
}

export { FormKey };
export type { TFormData };
