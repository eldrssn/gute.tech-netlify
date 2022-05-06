type Content = string | string[][] | undefined;

interface Property {
  title: string;
  value: string;
}

type TabProps = {
  content?: Property[] | Content;
};

type WindowSideType = number | null;

enum DescriptionTypes {
  properties = 'properties',
  description = 'description',
  installation = 'installation',
  faq = 'faq',
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
