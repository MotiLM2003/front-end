import React from 'react';
import { Spinner } from '@chakra-ui/react';
const Loader = ({ text = 'Loading...' }) => {
  return (
    <div class='wof-loader'>
      <div className='loader-bg'></div>
      <div className='wof-loader-content'>
        <div className='flex items-center  flex-col gap-0 justify-center'>
          <div>
            <Spinner
              color='white'
              emptyColor='gray.300'
              size='xl'
              thickness='15px'
              speed='1.5s'
            />
          </div>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
