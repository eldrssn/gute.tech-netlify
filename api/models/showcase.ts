export type ShowcaseResponseData = {
  title: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  description: string;
  tagline: string;
  footer_text: string;
  privacy_policy_link: string;
  show_logo_in_footer: boolean;
  social_link_vk: string;
  social_link_instagram: string;
  social_link_facebook: string;
  metrics: {
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
};
