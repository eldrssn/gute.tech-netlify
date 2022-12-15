import HomePage from 'components/base/home';
import { DEV_HOST } from 'constants/variables';
import { wrapper } from 'store';
import { fetchShowcase } from 'store/reducers/showcase/actions';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const showcase = await fetch(
      `https://api-stage.gute.tech/api/v1/showcase/`,
      // `${process.env.NEXT_PUBLIC_API_URL}/v1/showcase/`,
      {
        headers: {
          'content-type': 'application/json',
          'X-Client-Host': DEV_HOST,
        },
      },
    ).then((response) => {
      return response.json();
    });

    store.dispatch(fetchShowcase(showcase));

    return {
      props: {},
    };
  },
);

export default HomePage;
