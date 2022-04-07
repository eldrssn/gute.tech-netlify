import { HandleClickProps, inputStepId } from '../../types';

export type Props = {
  isOpenPopover: boolean;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: HandleClickProps) => void;
  setIsLoadingOptionList: (isLoadingOptionList: boolean) => void;
  inputStepId: inputStepId;
};
