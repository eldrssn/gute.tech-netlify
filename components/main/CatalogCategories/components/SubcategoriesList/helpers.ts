const getPathWithoutProductSlug = (asPath: string) =>
  asPath.split('/').slice(0, -1).join('/');

export { getPathWithoutProductSlug };
