export type Content = string | string[][] | undefined;

export interface Property {
  title: string;
  value: string;
}

export type TabProps = {
  content?: Property[] | Content;
};

export type WindowSideType = number | null;

export enum DescriptionTypes {
  properties = 'properties',
  description = 'description',
  installation = 'installation',
  faq = 'faq',
}

export type DescriptionType = keyof typeof DescriptionTypes;

export type TabsProps = Record<DescriptionType, Content>;
