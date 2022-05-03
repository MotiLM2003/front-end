import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setId } from '../../store/menuSlice';
const MenuItem = ({ itemId, menuId, text, path, isHasSubMenu = false }) => {
  const dispatch = useDispatch();
  const [isSubMenu, setIsSubMenu] = useState(false);

  useEffect(() => {
    console.log(isSubMenu);
  }, [isSubMenu]);

  return (
    <li
      onMouseOver={() => {
        setIsSubMenu(true);
      }}
      onMouseOut={() => {
        setIsSubMenu(false);
      }}
      className={`relative   primary-hover ${
        menuId === itemId ? 'text-primary selected' : ''
      }`}
      onClick={() => {
        dispatch(setId(itemId));
      }}
    >
      <Link href={path}>{text}</Link>
      {isHasSubMenu && isSubMenu && (
        <div
          className={`absolute border p-1 border-shades-300 rounded shadow top-[23px] bg-white min-w-[200px] text-black items-center left-[-70px]  flex-col flex justify-center`}
        >
          <div className='hover:text-primary  hover:font-bold'>
            <Link href='why-us'> Why Us?</Link>
          </div>
          <div className='hover:text-primary  hover:font-bold'>
            <Link href='/our-campaigns'> Our Campaign</Link>
          </div>
        </div>
      )}
    </li>
  );
};

export default MenuItem;
