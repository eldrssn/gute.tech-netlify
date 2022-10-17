import { StoreState, StoreError, ErrorAction } from 'store/types';

enum ShowcaseStoreBlocks {
  SHOWCASE = 'showcase',
}

type Metrics = {
  metric_id: number;
  button_card_buy: string;
  button_card_cart: string;
  button_product_buy: string;
  button_product_cart: string;
  button_product_help: string;
  button_product_special: string;
  button_global_help: string;
  button_cart_help: string;
  button_cart_special: string;
  button_cart_submit: string;
  button_callback_submit: string;
  button_buy_submit: string;
};

type ShowcaseData = {
  title: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  description: string;
  tagline: string;
  footerText: string;
  privacyPolicyLink: string;
  showLogoInFooter: boolean;
  socialLinkVk: string;
  socialLinkInstagram: string;
  socialLinkFacebook: string;
  metrics: Metrics | null;
};

type ShowcaseState = {
  data: ShowcaseData;
} & StoreState;

type ShowcaseStore = {
  [ShowcaseStoreBlocks.SHOWCASE]: ShowcaseState;
};

export type { ErrorAction, StoreError, ShowcaseStore, ShowcaseData };
