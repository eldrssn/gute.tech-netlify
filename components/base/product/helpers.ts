const getProductSlug = (categorySlug: string) =>
  categorySlug.split('_')[1].split('&')[0];

export { getProductSlug };
