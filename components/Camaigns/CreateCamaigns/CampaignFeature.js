import React from 'react';
import { Switch } from '@chakra-ui/react';
const CampaignFeature = ({ text, field, onChange }) => {
  return (
    <div className='flex gap-2 items-center border border-primary p-2 rounded bg-white'>
      <div>{text}</div>
      <div>
        <Switch colorScheme='red' onChange={onChange} isChecked={field} />
      </div>
    </div>
  );
};

export default CampaignFeature;
