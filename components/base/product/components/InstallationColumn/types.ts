import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { FormData } from '../../components/TabInstallation/types';
import { optionColumnData } from '../../types';

type Props = {
  column: optionColumnData;
  getValues: UseFormGetValues<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export type { Props };
