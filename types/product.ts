export type Content = string | string[][] | undefined;

export type TabProps = {
  content?: Content;
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
