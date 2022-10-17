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
      metrics: null,
    },
    isLoading: false,
    error: null,
  },
};

export { initialState };
