import React, { useState } from 'react';
import email from '../../images/icons/email-2.svg';
import Input from '@components/Input/Input';
import account from '../../images/icons/account2.svg';
import shield from '../../images/icons/dark/shield.svg';
import mobile from '../../images/icons/dark/mobile.svg';
import globe from '../../images/icons/dark/globe.svg';
import id from '../../images/icons/dark/id.svg';
import date from '../../images/icons/dark/date.svg';
import cloud from '../../images/icons/dark/cloud.svg';
import country from '../../images/icons/dark/country.svg';
import city from '../../images/icons/dark/city.svg';
import creditCard from '../../images/icons/dark/credit-card.svg';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../../images/icons/dark/sound.svg';
import AddRabi from './AddRabi';

const Stage2 = ({ onSetStage, data, onChange }) => {
  const [rabiList, setRabiList] = useState([]);
  const [isCertificate, setIsCertificate] = useState(false);

  const handleCer = (e) => {
    const value = e.target.value;

    setIsCertificate((isCertificate = value === '1'));
  };
  return (
    <motion.div
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ x: -400, opacity: 0 }}
      className='mt-4 md:px-[4rem] overflow-hidden'
    >
      <div className='flex flex-col gap-2'>
        <h4>Campaign Details:</h4>
        <div>
          <Input
            icon={sound}
            type='text'
            placeholder='Name of the organization / camoaign / cause'
            value={data.companyName}
            name='companyName'
            onChange={onChange}
          />
          <div className='flex gap-3 mt-4 '>
            <textarea
              value={data.moreDetails}
              name='moreDetails'
              onChange={onChange}
              placeholder='Details: (Please enter description of cause, and theorganization size/location (if applicable). Please elaborate. '
              className='bg-white outline-none min-h-[100px] text-xs w-[100%] border rounded p-2  border-shades-300'
            />
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <h4>Vaad Hatzedaka Certificate:</h4>
        <p>Rabbonim who can serve as a reference for this cause:</p>
        <div className='rabiList'>
          <AddRabi
            initialRabi={{ name: '', phone: '', address: '' }}
            WithPlus={true}
            withMinus={false}
            onAdd={(rabi) => {
              setRabiList([...rabiList, rabi]);
            }}
          />
          {rabiList.length > 0 &&
            rabiList.map(({ name, phone, address }) => (
              <AddRabi
                initialRabi={{ name: name, phone: phone, address: address }}
                WithPlus={false}
                withMinus={true}
                onRemove={(rabi) => {
                  setRabiList(
                    rabiList.filter(
                      (x) =>
                        x.name !== rabi.name &&
                        x.phone !== rabi.phone &&
                        x.address !== rabi.address
                    )
                  );
                }}
              />
            ))}
        </div>
      </div>

      <div className='mt-12'>
        <h3 className='text-black'>
          Do you already have a certificate from Vaad Hatzedaka of Lakewood?
        </h3>
        <div>
          <div className='flex  mt-2 items-center gap-3'>
            <input type='radio' name='isCer' value={0} onChange={handleCer} />
            <p>If yes, please enter certificate number</p>
            <div>
              <Input
                type='number'
                placeholder='Certificate number'
                value={data.certificateNumber}
                name='certificateNumber'
                onChange={onChange}
              />
            </div>
          </div>
          <div className='flex  mt-2 items-center gap-3'>
            <input type='radio' name='isCer' value={1} onChange={handleCer} />
            <p>
              If not, your cause must be reviewed by the Vaad Hatzedaka of
              Lakewood to obtain a certificate.
            </p>
          </div>
        </div>
        <AnimatePresence>
          {isCertificate && (
            <motion.div
              initial={{ h: 0, opacity: 0 }}
              animate={{ h: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ x: -400, opacity: 0 }}
            >
              <div className='flex  items-center gap-3 mt-6'>
                <input type='checkbox' name='isAgree'></input>
                <p className='text-red font-bold'>
                  I agree to pay $50 to the Vaad Hatzedaka of Lakewood if a
                  certificate is granted.
                </p>
              </div>

              <div className='mt-2 flex items-center gap-2'>
                <h4>Membership Fee</h4>
                <p>
                  The cost of using the World Of Tzedeka is{' '}
                  <span className='text-red font-bold'>28$ /mo</span>
                </p>
              </div>
              <div className='mt-4 location'>
                <div>
                  <h3 className='text-black'>Card Number:</h3>
                  <Input
                    type='number'
                    icon={creditCard}
                    placeholder='***********'
                    value={data.creditCardNumber}
                    name='creditCardNumber'
                    onChange={onChange}
                  />
                </div>
                <div className='mt-4 flex'>
                  <h4 className='text-black basis-1/2'>Expiry (MM/YY)</h4>
                  <h4 className='text-black basis-1/2'>Card Code:</h4>
                </div>
                <div className='mt-4 flex gap-4'>
                  <Input
                    icon={creditCard}
                    placeholder='MM/YY'
                    value={data.creditCardExpire}
                    name='creditCardExpire'
                    onChange={onChange}
                  />
                  <Input
                    icon={creditCard}
                    placeholder='CVC'
                    value={data.CVC}
                    name='CVC'
                    onChange={onChange}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className='text-black font-xs mt-8 flex justify-center items-center text-center'>
        By clicking on the submit button below, you agree to our terms and to
        our $28 monthly fee. This fee will continue to be charged monthly until
        we receive an electronic notification that you want to cancel your
        subscription. Please allow up to one month from notice of cancelation.*
      </p>
      <div className='mt-2 md:mt-[3rem] flex justify-center'>
        <button
          class='bg-red  hover:bg-red-h duration-500  transition-all text-white p-2 rounded min-w-[200px] font-bold text-xl'
          value=''
          onClick={() => {
            onSetStage(2);
          }}
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
};

export default Stage2;
