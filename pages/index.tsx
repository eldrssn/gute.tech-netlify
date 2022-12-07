import { wrapper } from 'store';
import { fetchCategoriesList } from 'store/reducers/catalog/actions';
import HomePage from 'components/base/home';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCategoriesList() as never);

    return {
      props: {},
    };
  },
);

export default HomePage;
