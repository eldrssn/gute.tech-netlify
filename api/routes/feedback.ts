import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

import { FeedbackRequestData } from '../models/feedback';

const postFeedback = ({ name, phone, message }: FeedbackRequestData) =>
  sendRequest({
    url: `/feedback/`,
    method: ApiMethods.POST,
    config: {
      data: {
        name,
        phone,
        message,
      },
    },
  });

export { postFeedback };
