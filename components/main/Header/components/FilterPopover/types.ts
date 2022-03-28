import { CardDetailsProps } from 'components/main/Header/types';

type AnchorElProps = HTMLElement | null;

export type Props = {
  anchorEl: AnchorElProps;
  setAnchorEl: React.Dispatch<React.SetStateAction<AnchorElProps>>;
  setCarDetails: React.Dispatch<React.SetStateAction<CardDetailsProps>>;
  carDetails: CardDetailsProps;
};
