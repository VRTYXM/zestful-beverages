import React, { useState, useRef, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, setSearchOrder, selectSort, selectOrder } from '../redux/slices/filterSlice';

export type SortItem = {
  name: string;
  sortProperty: string;
};

export const list: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort: React.FC = memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const order = useSelector(selectOrder);

  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  const setOrder = (type: string) => {
    dispatch(setSearchOrder(type));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <div className="svg-container">
          <svg
            className={order === 'desc' ? 'svg-active' : ''}
            onClick={() => setOrder('desc')}
            width="20px"
            height="20px"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M12 4V20M12 4L8 8M12 4L16 8"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>{' '}
            </g>
          </svg>
          <svg
            className={order === 'asc' ? 'svg-active' : ''}
            onClick={() => setOrder('asc')}
            width="20px"
            height="20px"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M12 4V20M12 4L8 8M12 4L16 8"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>{' '}
            </g>
          </svg>
        </div>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
