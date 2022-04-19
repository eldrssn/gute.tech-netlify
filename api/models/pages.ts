type PageMenuItemData = {
  title: string;
  slug: string;
  sort: number;
};

type PageData = {
  title: string;
  text: string;
};

type PageSlug = Pick<PageMenuItemData, 'slug'>;

export type { PageMenuItemData, PageSlug, PageData };
