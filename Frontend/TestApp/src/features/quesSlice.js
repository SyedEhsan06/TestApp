import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQues = createAsyncThunk('fetchQues', async ({ subject, chapter }, { dispatch }) => {
  const response = await fetch(`https://test-app-backend-xdeo.onrender.com/api/ques/${subject}/${chapter}`, {
    method: 'GET',
    headers: {
      'auth-token': localStorage.getItem("token"),
    },
  });
  const data = await response.json();
    return data;
});

const quesSlice = createSlice({
  name: 'ques',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQues.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(fetchQues.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchQues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});


export default quesSlice.reducer;
