export type Content = string | string[][];

export type TabProps = {
  content: Content;
};

export type WindowSideType = number | null;

export enum DescriptionTypes {
  characteristic = 'characteristic',
  description = 'description',
  installation = 'installation',
  faq = 'faq',
}

export type DescriptionType = keyof typeof DescriptionTypes;

export type TabsProps = {
  productInfo: Record<string, Content>;
};
