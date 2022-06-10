import {
  ListOptionsItemData,
  TransportInfoResponseData,
} from 'api/models/transport';
import { StoreState, StoreError, ErrorAction } from 'store/types';

enum TransportStoreBlocks {
  BRANDS = 'brands',
  MODELS = 'models',
  YEARS = 'years',
  ENGINES = 'engines',
  TRANSPORT_ID = 'transportId',
  TRANSPORT_INFO = 'transportInfo',
}

type TransportIdData = string;

type TransportInfoState = {
  data: TransportInfoResponseData | null;
} & StoreState;

type YearsState = {
  data: ListOptionsItemData[];
} & StoreState;

type EnginesState = {
  data: ListOptionsItemData[];
} & StoreState;

type ModelsState = {
  data: ListOptionsItemData[];
} & StoreState;

type BrandsState = {
  data: ListOptionsItemData[];
} & StoreState;

type TransportStore = {
  [TransportStoreBlocks.BRANDS]: BrandsState;
  [TransportStoreBlocks.MODELS]: ModelsState;
  [TransportStoreBlocks.YEARS]: YearsState;
  [TransportStoreBlocks.ENGINES]: EnginesState;
  [TransportStoreBlocks.TRANSPORT_ID]: TransportIdData;
  [TransportStoreBlocks.TRANSPORT_INFO]: TransportInfoState;
};

export type { ErrorAction, StoreError, TransportStore, TransportIdData };

export { TransportStoreBlocks };
