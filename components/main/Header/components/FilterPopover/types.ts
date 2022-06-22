import { HandleClickProps, inputStepId, StepInputs } from '../../types';

type FilterPopoverProps = {
  isOpenPopover: boolean;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: HandleClickProps) => void;
  setIsLoadingOptionList: (isLoadingOptionList: boolean) => void;
  inputStepId: inputStepId;
  openPopoverId: StepInputs;
  searchValue?: string | null;
  handleClosePopover: () => void;
  setTransportType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type { FilterPopoverProps };
