export type Props = {
  isOpenPopover: boolean;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenPopover: (isOpenPopover: boolean) => void;
  handleClick: (value: string) => void;
  step: number;
};
