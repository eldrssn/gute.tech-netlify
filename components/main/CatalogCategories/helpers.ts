import { Crumb } from 'hooks/useBreadcrumbs/types';

const sliceLastElement = (array: Crumb[]) => array.slice(0, -1);

export { sliceLastElement };
