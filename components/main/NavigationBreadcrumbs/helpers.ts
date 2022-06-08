import { Crumb } from 'hooks/useBreadcrumbs/types';

const checkLoadingCrumbs = (currentCrumbs: Crumb[]) =>
  currentCrumbs.some((crumb) => !crumb?.text);

export { checkLoadingCrumbs };
