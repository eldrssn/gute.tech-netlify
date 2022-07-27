const CATALOG_QUERY_DEFAULT = 'page=1&order=byPopularDown';
const IS_FROM_WIDGETS = 'isFromWidgets';
const TIMEOUT_DELAY = 250;

enum isFromWidgets {
  FALSE = '0',
  TRUE = '1',
}

enum TotalBoxRedirectUrls {
  ORDER = '/order',
  PAYMENT = '/payment',
}

export {
  CATALOG_QUERY_DEFAULT,
  IS_FROM_WIDGETS,
  TIMEOUT_DELAY,
  isFromWidgets,
  TotalBoxRedirectUrls,
};
