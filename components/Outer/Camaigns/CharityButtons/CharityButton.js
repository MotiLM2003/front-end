import { Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

// project imports
import temp from '../../../../images/temp/charity-button-temp.png';
const CharityButton = ({ item }) => {
  const { title, description } = item;
  return (
    <div className='  w-[225px] rounded '>
      <div className='flex flex-col'>
        <Image src={temp} width={200} height={100} />

        <div className='bg-primary p-1 -mt-2 text-center  min-h-[250px] pb-10 rounded-b '>
          <Text className='text-white font-bold my-2'>{title}</Text>
          <Text className='text-white '>{description}</Text>
        </div>
      </div>
    </div>
  );
};

export default CharityButton;
