import { AnalogueItem } from 'api/models/catalog';

type Content =
  | string
  | string[][]
  | undefined
  | Record<string, string>[]
  | Property[]
  | AnalogueItem[];

interface Property {
  title: string;
  value: string | undefined;
}

type TabProps = {
  content?: Property[] | Content;
  className?: string;
};

type WindowSideType = number | null;

enum DescriptionTypes {
  properties = 'properties',
  description = 'description',
  installation = 'installation',
  reviews = 'reviews',
  faq = 'faq',
  analogues = 'analogues',
}

type DescriptionType = keyof typeof DescriptionTypes;

type TabsProps = Record<DescriptionType, Content>;

export { DescriptionTypes };

export type {
  Content,
  Property,
  TabProps,
  WindowSideType,
  DescriptionType,
  TabsProps,
};
