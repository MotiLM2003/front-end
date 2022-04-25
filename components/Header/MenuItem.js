import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setId } from '../../store/menuSlice';
const MenuItem = ({ itemId, menuId, text, path }) => {
  const dispatch = useDispatch();
  return (
    <li
      className={`primary-hover ${
        menuId === itemId ? 'text-primary selected' : ''
      }`}
      onClick={() => {
        dispatch(setId(itemId));
      }}
    >
      <Link href={path}>{text}</Link>
    </li>
  );
};

export default MenuItem;
