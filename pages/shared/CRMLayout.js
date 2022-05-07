import Footer from '@components/CRM/Footer/Footer';
import Header from '@components/CRM/Header/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className=''>
        <div className='grow'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
