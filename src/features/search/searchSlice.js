import {createSlice} from '@reduxjs/toolkit';
import {getUsersToFollow} from './searchAPI';

const initialState = {
  loading: false,
  success: false,
  search: '',
  users: [],
  error: null,
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading(state, {payload}) {
      state.loading = payload;
    },
    setUsers(state, {payload}) {
      state.users = payload;
    },
    setHistory(state, {payload}) {
      state.history.push(payload);
    },
    clearHistory(state) {
      state.history = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersToFollow.fulfilled, (state, action) => {
      state.success = true;
      state.users = action.payload;
    });
  },
});

export const SearchList = state => state.search;
export const SearchTerm = state => state.search.search;

export const {setLoading, setUsers} = searchSlice.actions;

export default searchSlice.reducer;
