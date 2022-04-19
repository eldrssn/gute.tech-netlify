import { StoreState, StoreError, ErrorAction } from 'store/types';

enum ShowcaseStoreBlocks {
  SHOWCASE = 'showcase',
}

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
};

type ShowcaseState = {
  data: ShowcaseData;
} & StoreState;

type ShowcaseStore = {
  [ShowcaseStoreBlocks.SHOWCASE]: ShowcaseState;
};

export type { ErrorAction, StoreError, ShowcaseStore, ShowcaseData };
