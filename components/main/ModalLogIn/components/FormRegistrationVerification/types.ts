type Props = {
  closeModal: () => void;
};

type TFormData = {
  code: string;
};

enum FormKey {
  CODE = 'code',
}

enum RetryButtonTitle {
  DEFAULT = 'Отправить код повторно',
  SUCCESS = 'Код отправлен',
  FAILURE = 'Произошла ошибка',
}

export { FormKey, RetryButtonTitle };
export type { TFormData, Props };
