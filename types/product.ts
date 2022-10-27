type Content =
  | string
  | string[][]
  | undefined
  | Record<string, string>[]
  | Property[];

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
  analogues = 'analogues',
}

type DescriptionType = keyof typeof DescriptionTypes;

type TabsProps = Record<DescriptionType, Content | undefined>;

export { DescriptionTypes };

export type {
  Content,
  Property,
  TabProps,
  WindowSideType,
  DescriptionType,
  TabsProps,
};
