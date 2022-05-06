import { HandleClickProps, inputStepId } from '../../types';

type FilterPopoverProps = {
  isOpenPopover: boolean;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: HandleClickProps) => void;
  setIsLoadingOptionList: (isLoadingOptionList: boolean) => void;
  inputStepId: inputStepId;
};

export type { FilterPopoverProps };
