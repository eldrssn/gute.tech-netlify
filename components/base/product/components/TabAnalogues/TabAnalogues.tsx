import React, { FC, useMemo, useState } from 'react';
import Link from 'next/link';

import { Content, TabProps } from 'types/product';
import { AnalogueItem } from 'api/models/catalog';
import { getLinkToProduct } from 'utility/helpers/linkmakers';
import { CustomButton } from 'components/ui/CustomButton';

import { MAX_ITEMS_COUNT } from './constants';
import styles from './tabAnalogues.module.scss';

const TabAnalogues: FC<TabProps> = ({ content }) => {
  const [isExpandedList, setIsExpandedList] = useState(false);
  const isTooManyItems = content && content.length > MAX_ITEMS_COUNT;

  const toggleExpandedList = () => {
    setIsExpandedList((isExpandedList) => !isExpandedList);
  };

  // TODO: перенести сюда фетчинг аналогов

  const items = useMemo(
    () => (isExpandedList ? content : content?.slice(0, MAX_ITEMS_COUNT)) || [],
    [isExpandedList, content],
  );

  if (items.length === 0) {
    return <p>Нет аналогов</p>;
  }

  const isProperties = (
    value: Content | AnalogueItem[],
  ): value is AnalogueItem[] => {
    return true;
  };

  if (!Array.isArray(items) || !isProperties(items)) {
    return <p>{items}</p>;
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
