import HomePage from 'components/base/home';
import { DEV_HOST } from 'constants/variables';
import { wrapper } from 'store';
import { fetchShowcase } from 'store/reducers/showcase/actions';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, res } = context;
    const isServer = req;

    // context.res.
    // res.writeHead();

    const headers = [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Permissions-Policy',
        value: 'geolocation=()',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
    ];

    headers.forEach(({ key, value }) => res.setHeader(key, value));

    const showcase = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/showcase/`,
      {
        headers: {
          'content-type': 'application/json',
          'X-Client-Host':
            process.env.NODE_ENV === 'production' && req?.headers.host
              ? req.headers.host
              : DEV_HOST,
          'Sec-Fetch-Site': 'same-origin',
        },
      },
    ).then((response) => {
      return response.json();
    });

    store.dispatch(fetchShowcase(showcase));

    return {
      props: {},
      fallback: true,
    };
  },
);

export default HomePage;
