import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userFetch = createAsyncThunk('user', async () => {
  const response = await fetch(`http://localhost:8000/api/auth/getuser`, {
    method: 'GET',
    headers: {
      'auth-token': localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  console.log(data)
    return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(userFetch.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});


export default userSlice.reducer;
