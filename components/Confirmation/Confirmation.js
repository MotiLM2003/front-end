import React from 'react';
import Image from 'next/image';

import cross from '../../images/icons/cross.svg';
const Confirmation = ({
  title = ' no title',
  children,
  visible = false,
  close,
}) => {
  return (
    <div className={`${visible ? 'block' : 'hidden'} overflow-hidden`}>
      <div className='conf-background'></div>
      <div className='conf-container rounded'>
        <div className='flex justify-between'>
          <h3>{title}</h3>
          <Image
            src={cross}
            width='25px'
            height='25px'
            className='cursor-pointer'
            onClick={close}
            layout='fixed'
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Confirmation;
