import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type Product = {
  id: string | number;
  title: string;
  country: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type SearchProductsParams = {
  categoryId: string;
  sortType: string;
  searchOrder: string;
  currentPage: string;
  searchValue: string;
};

export const fetchProducts = createAsyncThunk<Product[], SearchProductsParams>(
  'products/fetchProductsStatus',
  async (params) => {
    const { categoryId, sortType, searchOrder, currentPage, searchValue } = params;

    const { data } = await axios.get<Product[]>(
      `https://66f17163415379191550eee7.mockapi.io/items?page=${currentPage}&limit=4&${
        Number(categoryId) > 0 ? `category=${categoryId}&` : ''
      }${searchValue ? `search=${searchValue}&` : ''}sortBy=${sortType}&order=${searchOrder}`,
    );

    return data;
  },
);

export const fetchProductsCount = createAsyncThunk<
  number,
  Omit<SearchProductsParams, 'currentPage'>
>('products/fetchProductsCount', async (params) => {
  const { categoryId, sortType, searchOrder, searchValue } = params;

  const response = await axios.get<Product[]>(
    `https://66f17163415379191550eee7.mockapi.io/items?${
      Number(categoryId) > 0 ? `category=${categoryId}&` : ''
    }${searchValue ? `search=${searchValue}&` : ''}sortBy=${sortType}&order=${searchOrder}`,
  );

  return response.data.length;
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ProductsSliceState {
  items: Product[];
  totalCount: number;
  status: Status;
}

const initialState: ProductsSliceState = {
  items: [],
  totalCount: 0,
  status: Status.LOADING, // loading || success || error
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        state.totalCount = 0;
      })
      .addCase(fetchProductsCount.fulfilled, (state, action) => {
        state.totalCount = action.payload;
      });
  },
});

export const selectProductsData = (state: RootState) => state.products;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
