import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { getLinkToProduct } from 'utility/helpers/linkmakers';
import { CustomButton } from 'components/ui/CustomButton';
import { fetchProductAnaloguesRead } from 'store/reducers/product/actions';
import { selectProductAnaloguesList } from 'store/reducers/product/selectors';

import { getProductSlugQuery } from '../../helpers';
import { MAX_ITEMS_COUNT } from './constants';
import styles from './tabAnalogues.module.scss';

const TabAnalogues: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: analogues } = useSelector(selectProductAnaloguesList);
  const content = analogues?.results;

  const productSlug = getProductSlugQuery(router);

  const [isExpandedList, setIsExpandedList] = useState(false);
  const isTooManyItems = content && content.length > MAX_ITEMS_COUNT;

  const toggleExpandedList = () => {
    setIsExpandedList((isExpandedList) => !isExpandedList);
  };

  useEffect(() => {
    dispatch(
      fetchProductAnaloguesRead({
        productSlug,
      }),
    );
  }, [productSlug, dispatch]);

  const items = useMemo(
    () => (isExpandedList ? content : content?.slice(0, MAX_ITEMS_COUNT)) || [],
    [isExpandedList, content],
  );

  if (items.length === 0) {
    return <p>Доступных аналогов нет</p>;
  }

  return (
    <>
      {items.map(
        ({ title, manufacturer = 'NO_BRAND', price, categories, slug }) => {
          const getLink = () =>
            getLinkToProduct({ categories, productSlug: slug });

          return (
            <Link href={getLink()} key={title}>
              <a className={styles.contentBox}>
                <span className={styles.manufacturer}>{manufacturer}</span>
                <span className={styles.title}>{title}</span>
                <span className={styles.spaceLine}></span>
                <span className={styles.price}>
                  {price}
                  <i className={styles.icon_ruble} />
                </span>
              </a>
            </Link>
          );
        },
      )}

      {isTooManyItems && (
        <CustomButton
          customStyles={styles.showButton}
          onClick={toggleExpandedList}
        >
          {isExpandedList ? 'Скрыть' : 'Показать все'}
        </CustomButton>
      )}
    </>
  );
};

export { TabAnalogues };
