import React, { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  initialState,
} from '../redux/slices/filterSlice';
import { fetchProducts, selectProductsData } from '../redux/slices/productsSlice';
import { list } from '../components/Sort';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import ProductBlock from '../components/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
  const searchOrder = useSelector((state: any) => state.filter.searchOrder);
  const currentPage = useSelector((state: any) => state.filter.currentPage);

  const { items, status } = useSelector(selectProductsData);

  const searchValue = useSelector((state: any) => state.filter.searchValue);

  const onChangeCategory = useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(page));
  };

  const getProducts = async () => {
    dispatch(fetchProducts({ categoryId, sortType, searchOrder, currentPage, searchValue }));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: categoryId,
        sortType: sortType,
        searchOrder: searchOrder,
        currentPage: currentPage,
      });

      if (window.location.search !== `?${queryString}`) {
        navigate(`/?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchOrder, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          sort: sort || { sortProperty: params.sortType as string, name: '' },
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          searchValue: '',
          searchOrder: String(params.searchOrder),
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем товары
  useEffect(() => {
    const initialQueryString = qs.stringify({
      categoryId: initialState.categoryId,
      sortType: initialState.sort.sortProperty,
      searchOrder: initialState.searchOrder,
      currentPage: initialState.currentPage,
    });

    if (!isSearch.current || window.location.search === `?${initialQueryString}`) {
      getProducts();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchOrder, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  const products = items.map((obj: any) => (
    <ProductBlock
      key={obj.id}
      id={obj.id}
      title={obj.title}
      price={obj.price}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все товары</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, ничего не удалось найти. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : products}</div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        categoryId={String(categoryId)}
        sortType={sortType}
        searchOrder={searchOrder}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Home;
