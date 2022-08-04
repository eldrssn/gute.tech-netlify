import { MAX_TITLE_LENGHT } from './constants';

const formatTittle = (title: string) =>
  title.length > MAX_TITLE_LENGHT
    ? title.substring(0, MAX_TITLE_LENGHT) + '...'
    : title;

export { formatTittle };
