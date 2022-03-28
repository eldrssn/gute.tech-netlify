export type IsDrawerProps = {
  isDrawer?: boolean;
};

export type CardDetailsProps = Record<
  | 'HEADER_CAR_SELECTION'
  | 'HEADER_MODEL_SELECTION'
  | 'HEADER_YEAR_SELECTION'
  | 'HEADER_ENGINE_SELECTION',
  string
>;
