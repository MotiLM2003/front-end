import React from 'react';
import CharityButton from './CharityButton';

const CharityButtons = ({ campaign }) => {
  const { charityButtons } = campaign;
  console.log('ch', charityButtons);
  return (
    <div className='grid grid-cols-4 justify-items-center'>
      {charityButtons &&
        charityButtons.map((item) => (
          <div>
            <CharityButton item={item} />
          </div>
        ))}
    </div>
  );
};

export default CharityButtons;
