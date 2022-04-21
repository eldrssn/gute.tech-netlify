import { sendRequest } from '../utils';

import { FeedbackRequestData } from '../models/feedback';

const postFeedback = ({ name, phone, message }: FeedbackRequestData) =>
  sendRequest({
    url: `/feedback/`,
    method: 'post',
    config: {
      data: {
        name,
        phone,
        message,
      },
    },
  });

export { postFeedback };
