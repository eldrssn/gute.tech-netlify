import { Content, DescriptionType } from 'types/product';

type TabContentByTypeProps = {
  type: DescriptionType;
  content?: Record<DescriptionType, Content | undefined>;
};

export type { TabContentByTypeProps };
