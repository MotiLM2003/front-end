import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import '../styles/confirmation.css';
import '../styles/buttons.css';

import store, { wrapper } from '../store/store';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
