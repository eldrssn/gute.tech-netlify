import { DescriptionType, TabsProps } from 'types/product';

type TabContentByTypeProps = {
  type: DescriptionType;
  content?: TabsProps;
};

export type { TabContentByTypeProps };
