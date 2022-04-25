import React from 'react';
import Image from 'next/image';
import logo from '../../images/logo.svg';
import search from '../../images/icons/search.svg';
import account from '../../images/icons/account.svg';
import downArrow from '../../images/icons/down-arrow.svg';
const Header = () => {
  return (
    <header className='p-3 flex default-container align-center  justify-between md:justify-center '>
      <div className='md:px-8'>
        <Image src={logo} width='238' height='43' />
      </div>
      <div className='hidden   md:flex grow justify-center items-center'>
        <ul className='flex    md:gap-12'>
          <li className='primary-hover'>Main</li>
          <li className='primary-hover'>About us</li>
          <li className='primary-hover'>Campaigns</li>
          <li className='primary-hover'>Our Service</li>
          <li className='primary-hover'>Get Started</li>
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <div className='bg-primary text-white text-xs flex justify-center items-center p-1 px-3 rounded  gap-3  cursor-pointer'>
          <span>English</span>
          <Image src={downArrow} width='12' height='12' alt='search icon' />
        </div>
        <Image
          src={search}
          width='19'
          height='19'
          alt='search icon'
          className='cursor-pointer'
        />
        <Image
          src={account}
          width='19'
          height='19'
          alt='account icon'
          className='cursor-pointer'
        />
      </div>
    </header>
  );
};

export default Header;
