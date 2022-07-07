import { ParsedUrlQueryInput } from 'querystring';
interface RouterQuery {
  setQueryOption: (queries: ParsedUrlQueryInput, scroll?: boolean) => void;
  removeQuery: (
    name: string,
    param?: string | undefined,
    scroll?: boolean,
  ) => void;
  getQueryOption: (name: string) => string | string[] | undefined;
  updateQueryOption: (name: string, param: string, scroll?: boolean) => void;
}

type RouterQueryOptions = string;

export type { RouterQuery, RouterQueryOptions };
