import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { fetchProductsCount, selectProductsData } from '../../redux/slices/productsSlice';
import { useAppDispatch } from '../../redux/store';
import { resetCurrentPage } from '../../redux/slices/filterSlice';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  categoryId: string;
  sortType: string;
  searchOrder: string;
  searchValue: string;
};

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
  categoryId,
  sortType,
  searchOrder,
  searchValue,
}) => {
  const dispatch = useAppDispatch();
  const { totalCount } = useSelector(selectProductsData);
  const itemsPerPage = 4;
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    dispatch(fetchProductsCount({ categoryId, sortType, searchOrder, searchValue }));
    dispatch(resetCurrentPage());
  }, [dispatch, categoryId, sortType, searchOrder, searchValue]);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={itemsPerPage}
      pageCount={pageCount}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
