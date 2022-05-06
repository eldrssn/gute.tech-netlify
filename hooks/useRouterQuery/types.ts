interface RouterQuery {
  setQueryOption: (name: string, param: string) => void;
  removeQuery: (name: string, param?: string | undefined) => void;
  getQueryOption: (name: string) => string | string[] | undefined;
  updateQueryOption: (name: string, param: string) => void;
}

type RouterQueryOptions = string;

export type { RouterQuery, RouterQueryOptions };
