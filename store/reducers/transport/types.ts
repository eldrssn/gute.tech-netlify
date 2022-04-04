import { StoreState, StoreError, ErrorAction } from 'store/types';
import { ListOptionsItemData } from 'types/transportStore';

enum TransportStoreBlocks {
  BRANDS = 'brands',
  MODELS = 'models',
  YEARS = 'years',
  ENGINES = 'engines',
}

type YearsState = {
  data: ListOptionsItemData[] | [];
} & StoreState;

type EnginesState = {
  data: ListOptionsItemData[] | [];
} & StoreState;

type ModelsState = {
  data: ListOptionsItemData[] | [];
} & StoreState;

type BrandsState = {
  data: ListOptionsItemData[] | [];
} & StoreState;

type TransportStore = {
  [TransportStoreBlocks.BRANDS]: BrandsState;
  [TransportStoreBlocks.MODELS]: ModelsState;
  [TransportStoreBlocks.YEARS]: YearsState;
  [TransportStoreBlocks.ENGINES]: EnginesState;
};

export type { ErrorAction, StoreError, TransportStore };

export { TransportStoreBlocks };
