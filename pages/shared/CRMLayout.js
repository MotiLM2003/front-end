import Footer from '@components/CRM/Footer/Footer';
import Header from '@components/CRM/Header/Header';
import Image from 'next/image';

import status from '../../images/icons/white/status.svg';
import heart from '../../images/icons/white/hand-heart.svg';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='flex'>
        <div className='basis-1/6 bg-shades-600 pl-4 py-10  rounded '>
          <div className='flex flex-col justify-center gap-4'>
            <div>
              <div className='flex text-white items-center gap-3 text-xs gap-4'>
                <Image src={status} />{' '}
                <label htmlFor=''>Status & Balance</label>
              </div>
            </div>
            <div>
              <div className='flex text-white items-center gap-3 text-xs'>
                <Image src={heart} /> <label htmlFor=''>Donations</label>
              </div>
            </div>
          </div>
          <div>
            <div className=''>
              <div className='grow'>{children}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
