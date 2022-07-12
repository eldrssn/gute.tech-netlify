import { TFormDataKeys } from './types';

const CUSTOM_TYPE_ERROR = 'custom';
const NON_FIELD_ERRORS = 'non_field_errors';

const modalFields: Record<string, TFormDataKeys> = {
  CODE: 'code',
  EMAIL: 'email',
};

export { modalFields, CUSTOM_TYPE_ERROR, NON_FIELD_ERRORS };
