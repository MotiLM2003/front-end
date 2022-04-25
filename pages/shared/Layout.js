import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='default-container flex flex-col '>
        <div className='grow'> {children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
