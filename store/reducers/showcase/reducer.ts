import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { fetchShowcase } from './actions';

import { ShowcaseStore, ErrorAction } from './types';
import { ShowcaseResponseData } from 'api/models/showcase';

const initialState: ShowcaseStore = {
  showcase: {
    data: null,
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
      ...payload,
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
