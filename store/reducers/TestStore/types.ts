enum TestStoreBlocks {
  TEST = 'test',
}

type ErrorAction = {
  error: {
    name: string;
    message: string;
  };
};

type StoreError = {
  name: string;
  message: string;
};

type StoreState = {
  isLoading: boolean;
  error: StoreError | null;
};

type TestData = string;

type TestState = {
  data: TestData | null;
} & StoreState;

type TestStore = {
  [TestStoreBlocks.TEST]: TestState;
};

export type { ErrorAction, TestData, StoreError, TestStore };

export { TestStoreBlocks };
