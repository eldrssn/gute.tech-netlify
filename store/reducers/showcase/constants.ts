import { ShowcaseStore } from './types';

const initialState: ShowcaseStore = {
  showcase: {
    data: {
      footerText: '',
      privacyPolicyLink: '',
      showLogoInFooter: false,
      socialLinkVk: '',
      socialLinkInstagram: '',
      socialLinkFacebook: '',
      tagline: '',
      description: '',
      phone: '',
      email: '',
      favicon: '',
      logo: '',
      title: '',
      metrics: {
        button_card_buy: '',
        button_card_cart: '',
        button_product_buy: '',
        button_product_cart: '',
        button_product_help: '',
        button_product_special: '',
        button_global_help: '',
        button_cart_help: '',
        button_cart_special: '',
        button_cart_submit: '',
        button_callback_submit: '',
        button_buy_submit: '',
      },
    },
    isLoading: false,
    error: null,
  },
};

export { initialState };
