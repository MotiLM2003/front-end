import React, { useState, useEffect } from 'react';
import CRMLayout from '../../../pages/shared/CRMLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCRMId } from '../../../store/menuSlice';
import plus from '../../../images/icons/white/plus.svg';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Confirmation from '@components/Confirmation/Confirmation';
import CreateCampaign from '@components/Camaigns/CreateCamaigns/CreateCampaign';
const id = 4;
const Campaigns = () => {
  const dispatch = useDispatch();
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  useEffect(() => {
    dispatch(setCRMId(id));
  }, []);

  const [isNewCampaign, setIsNewCampaign] = useState(false);

  useEffect(() => {
    console.log(isNewCampaign);
  }, [isNewCampaign]);
  return (
    <CRMLayout>
      <div className='flex justify-between items-center'>
        <div>
          <div className='flex flex-col gap-4 justify-center'>
            <div className='flex items-center pt-4 pr-y'>
              <h2>Campaigns </h2> <h2 className='font-normal'>/ User name</h2>
            </div>
            <div className='flex items-center gap-4'>
              <h5>
                All Campaigns<span className='text-black'>(0)</span>
              </h5>
              <div className='text-red font-bold text-xl'>|</div>
              <h5>
                Archive Campaigns<span className='text-black'>(0)</span>
              </h5>
              <div className='text-red font-bold text-xl'>|</div>
              <h5>
                Pending<span className='text-black'>(0)</span>
              </h5>
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsNewCampaign(true)}
          className='md:mr-[3rem] bg-black p-2 text-white cursor-pointer hover:scale-[1.05]  transition duration-500  flex gap-4 items-center justify-center rounded'
        >
          <div>
            <Image src={plus} />
          </div>
          <div>New Campaign</div>
        </div>
      </div>
      <AnimatePresence>
        {isNewCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -400 }}
          >
            <Confirmation
              title={
                <div className='flex gap-6 pb-1 border-b overflow-hidden  items-center md:min-w-[600px] '>
                  <div>New Campaign</div>
                </div>
              }
              close={() => {
                setIsNewCampaign(false);
              }}
              visible={isNewCampaign}
            >
              <CreateCampaign />
            </Confirmation>{' '}
          </motion.div>
        )}
      </AnimatePresence>
    </CRMLayout>
  );
};

export default Campaigns;
