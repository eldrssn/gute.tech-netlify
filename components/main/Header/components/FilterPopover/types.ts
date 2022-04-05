import { HandleClickProps, inputStepId } from '../../types';

export type Props = {
  isOpenPopover: boolean;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: HandleClickProps) => void;
  setIsLoading: (isLoading: boolean) => void;
  inputStepId: inputStepId;
};
