import HomePage from 'components/base/home';
import { DEV_HOST } from 'constants/variables';
import { wrapper } from 'store';
import { fetchShowcase } from 'store/reducers/showcase/actions';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req } = context;
    const isServer = req;

    if (isServer) {
      const showcase = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/showcase/`,
        {
          headers: {
            'content-type': 'application/json',
            'X-Client-Host':
              process.env.NODE_ENV === 'production' && req?.headers.host
                ? req.headers.host
                : DEV_HOST,
          },
        },
      ).then((response) => {
        return response.json();
      });

      console.log('SHOWCASE', showcase);

      store.dispatch(fetchShowcase(showcase));
    }

    return {
      props: {},
    };
  },
);

export default HomePage;
