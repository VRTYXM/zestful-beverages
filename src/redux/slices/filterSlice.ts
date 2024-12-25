import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Sort = {
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  searchOrder: string;
  currentPage: number;
}

export const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  searchOrder: 'desc',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchOrder(state, action: PayloadAction<string>) {
      state.searchOrder = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.searchOrder = action.payload.searchOrder;
      state.categoryId = Number(action.payload.categoryId);
    },
    resetCurrentPage(state) {
      state.currentPage = initialState.currentPage;
    },
    resetFilters: () => initialState,
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectOrder = (state: RootState) => state.filter.searchOrder;

export const {
  setCategoryId,
  setSort,
  setSearchOrder,
  setCurrentPage,
  setSearchValue,
  setFilters,
  resetCurrentPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
