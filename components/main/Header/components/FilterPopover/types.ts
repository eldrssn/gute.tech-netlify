import { handleClickProps } from '../../types';

export type Props = {
  isOpenPopover: boolean;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: handleClickProps) => void;
  setIsLoading: (isLoading: boolean) => void;
  inputStepId: number;
};
