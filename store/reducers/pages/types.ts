import { StoreState, StoreError, ErrorAction } from 'store/types';
import { PageMenuItemData, PageData } from 'api/models/pages';

enum PagesStoreBlocks {
  PAGESMENU = 'pagesmenu',
  PAGE = 'page',
}

type PagesMenuState = {
  data: PageMenuItemData[];
} & StoreState;

type PageState = {
  data: PageData | null;
} & StoreState;

type PagesStore = {
  [PagesStoreBlocks.PAGESMENU]: PagesMenuState;
  [PagesStoreBlocks.PAGE]: PageState;
};

export type { ErrorAction, StoreError, PagesStore };
