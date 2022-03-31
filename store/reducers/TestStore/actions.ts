import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('testStore/fetchData', async () => {
  const data = await {
    /* запрос */
  };

  return data;
});

const resetData = createAction('resetData');

export { fetchData, resetData };
