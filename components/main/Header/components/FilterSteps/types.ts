import { CardDetailsProps } from '../../types';

export type Props = {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  carDetails: CardDetailsProps;
};
