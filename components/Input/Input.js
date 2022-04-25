import React from 'react';
import Image from 'next/image';

const Input = ({
  type = 'text',
  placeholder = '',
  icon = null,
  backIcon = null,
  backIconCallback = null,
}) => {
  return (
    <div className='relative'>
      {icon && (
        <div className={`absolute top-[7.5px] left-[5px]`}>
          <Image src={icon} width={21} height={24} />
        </div>
      )}
      {backIcon && (
        <div
          className={`absolute top-[7.5px] right-[5px] ${
            backIconCallback ? ' cursor-pointer' : ''
          }`}
          onClick={() => {
            if (backIconCallback) {
              backIconCallback();
            }
          }}
        >
          <Image src={backIcon} width={21} height={24} />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`outline-none rounded-md p-4  pl-8 py-[.5px] text-xs h-[2.5rem] w-[240px]`}
      />
    </div>
  );
};

export default Input;
