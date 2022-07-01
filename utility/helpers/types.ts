type CreateAsyncActionProps<ResponseData, RequestData> = {
  typeAction: string;
  request: (requestData: RequestData) => Promise<ResponseData>;
  shouldHandleError?: boolean;
  shouldReturnRequestData?: boolean;
  onFulfilled?: (data: ResponseData) => void;
};

export type { CreateAsyncActionProps };
