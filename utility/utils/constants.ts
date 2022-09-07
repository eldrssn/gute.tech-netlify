const CATALOG_QUERY_DEFAULT = 'page=1&order=byPopularDown';
const TIMEOUT_DELAY = 250;
const ENTER_BUTTON_KEY = 'Enter';
const PRODUCT_MARKER = 'product_';

enum TotalBoxRedirectUrls {
  ORDER = '/order',
  PAYMENT = '/payment',
}

export {
  CATALOG_QUERY_DEFAULT,
  TIMEOUT_DELAY,
  TotalBoxRedirectUrls,
  ENTER_BUTTON_KEY,
  PRODUCT_MARKER,
};
