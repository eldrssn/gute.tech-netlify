import { UseFormGetValues } from 'react-hook-form';

import {
  HandleClickProps,
  inputStepId,
  FormData,
  StepInputs,
} from '../../types';

type FilterPopoverProps = {
  resetFilterFormFromBrand: () => void;
  isOpenPopover: boolean;
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: ({ title, slug, inputStepId }: HandleClickProps) => void;
  setIsLoadingOptionList: (isLoadingOptionList: boolean) => void;
  inputStepId: inputStepId;
  searchValue?: string | null;
  handleClosePopover: () => void;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  getValues: UseFormGetValues<FormData>;
};

export type { FilterPopoverProps };
