import 'bootstrap/dist/css/bootstrap.css';
import { buildClient } from '../api/build-client';
import Header from '../components/header';

const Wrapper = ({ Component, pageProps, currentUser }) => (
  <div>
    <Header currentUser={currentUser} />
    <Component {...pageProps} />
  </div>
);


Wrapper.getInitialProps = async (appContext) => {
  try {
    const { data } = await buildClient(appContext.ctx)
      .get('/api/users/currentuser');
    let pageProps = {};

    if (appContext?.Component?.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
      pageProps,
      ...data
    };
  } catch (error) {
    return error?.response?.data;
  }
};

export default Wrapper;