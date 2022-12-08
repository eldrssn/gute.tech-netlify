import { AnyAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ShowcaseResponseData } from 'api/models/showcase';

import { fetchShowcase } from './actions';
import {
  ShowcaseStore,
  // ErrorAction
} from './types';
import { initialState } from './constants';

const handlers = {
  [HYDRATE]: (state: ShowcaseStore, action: AnyAction) => {
    state.showcase = action.payload.showcaseStore.showcase;
  },

  // TODO: оттестить и поправить
  // [fetchShowcase.pending.type]: (state: ShowcaseStore) => {
  //   state.showcase.isLoading = true;
  // },
  // [fetchShowcase.fulfilled.type]: (
  [fetchShowcase.type]: (
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
      metrics: payload.metrics,
    };
    state.showcase.isLoading = false;
    state.showcase.error = null;
  },
  // [fetchShowcase.rejected.type]: (
  //   state: ShowcaseStore,
  //   { error }: ErrorAction,
  // ) => {
  //   const errorData = { name: error.name, message: error.message };
  //   state.showcase.isLoading = false;
  //   state.showcase.error = errorData;
  // },
};

const showcaseReducer = createReducer(initialState, handlers);

export { showcaseReducer };
