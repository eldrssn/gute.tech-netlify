import { QueryUrl } from 'constants/variables';

const getTransportParams = (transportId: string) => {
  return `/?${QueryUrl.TRANSPORT_ID}=${transportId}`;
};

export { getTransportParams };
