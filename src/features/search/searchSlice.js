import {createSlice} from '@reduxjs/toolkit';
import {getUsersToFollow} from './searchAPI';

const initialState = {
  loading: false,
  success: false,
  users: [],
  search_list: [],
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading(state, {payload}) {
      state.loading = payload;
    },
    setUsers(state, {payload}) {
      state.search_list = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersToFollow.fulfilled, (state, action) => {
      state.success = true;
      state.users = action.payload;
    });
  },
});

export const UsersList = state => state.search.users;
export const SearchList = state => state.search.search_list;

export const {setLoading, setUsers} = searchSlice.actions;

export default searchSlice.reducer;
