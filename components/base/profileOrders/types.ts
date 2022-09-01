type dateRange = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}[];

type OrdersFilterProps = {
  isOpenDatePicker: boolean;
  setIsOpenDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { dateRange, OrdersFilterProps };
