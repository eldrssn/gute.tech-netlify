import { TotalBoxRedirectUrls } from 'utility/utils/constants';

type Props = {
  redirectUrl: TotalBoxRedirectUrls;
  onClick?: () => void;
  isCartPage?: boolean;
  slugsRemovedElements?: string[];
};

export { TotalBoxRedirectUrls };
export type { Props };
