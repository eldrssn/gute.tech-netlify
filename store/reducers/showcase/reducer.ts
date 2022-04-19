import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { fetchShowcase } from './actions';

import { ShowcaseStore, ErrorAction } from './types';
import { ShowcaseResponseData } from 'api/models/showcase';

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
    },
    isLoading: false,
    error: null,
  },
};

const handlers = {
  [fetchShowcase.pending.type]: (state: ShowcaseStore) => {
    state.showcase.isLoading = true;
  },
  [fetchShowcase.fulfilled.type]: (
    state: ShowcaseStore,
    { payload }: PayloadAction<ShowcaseResponseData>,
  ) => {
    state.showcase.data = {
      footerText: payload.footer_text,
      privacyPolicyLink: payload.privacy_policy_link,
      showLogoInFooter: payload.show_logo_in_footer,
      socialLinkVk: payload.social_link_vk,
      socialLinkInstagram: payload.social_link_instagram,
      socialLinkFacebook: payload.social_link_facebook,
      tagline: payload.tagline,
      description: payload.description,
      phone: payload.phone,
      email: payload.email,
      favicon: payload.favicon,
      logo: payload.logo,
      title: payload.title,
    };
    state.showcase.isLoading = false;
    state.showcase.error = null;
  },
  [fetchShowcase.rejected.type]: (
    state: ShowcaseStore,
    { error }: ErrorAction,
  ) => {
    const errorData = { name: error.name, message: error.message };
    state.showcase.isLoading = false;
    state.showcase.error = errorData;
  },
};

const showcaseReducer = createReducer(initialState, handlers);

export { showcaseReducer };
