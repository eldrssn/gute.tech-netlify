import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField,
  Typography,
  Container,
  Divider,
  Box,
  CardMedia,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import cn from 'classnames';

import {
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
} from 'store/reducers/catalog/actions';
import {
  selectCatalogSearchRead,
  // selectCategoriesTreeList, //TODO: добавить при праи=вильной урле
} from 'store/reducers/catalog/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { SCROLL_DELAY } from 'constants/variables';
import { useDebounce } from 'hooks/useDebounce';

import { SearchMenuProps } from './types';
import styles from './styles.module.scss';

const SearchMenuMobile: FC<SearchMenuProps> = ({
  handleClose,
  closeMainDrawer,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const dispatch = useDispatch();
  const router = useRouter();
  const catalogSearchRead = useSelector(selectCatalogSearchRead);
  const debouncedSearchTerm = useDebounce(searchValue, 1000);

  const categorySearch = catalogSearchRead.data?.categories;
  const productSeacrh = catalogSearchRead.data?.products;

  const debouncedSearchTermValid = debouncedSearchTerm.length >= 3;
  const isLoading = catalogSearchRead.isLoading;
  const isCategorySearch = categorySearch
    ? Boolean(categorySearch.length)
    : false;
  const isProductSeacrh = productSeacrh ? Boolean(productSeacrh.length) : false;
  const isCatalogSearchRead = isCategorySearch || isProductSeacrh || isLoading;

  const handleClick = (link: string) => {
    router.push(link);
    handleClose();
    setTimeout(closeMainDrawer, SCROLL_DELAY);
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (debouncedSearchTermValid) {
      dispatch(fetchCatalogSearchRead({ searchValue: debouncedSearchTerm }));
      return;
    }

    dispatch(clearCatalogSearchRead());
  }, [dispatch, debouncedSearchTerm, debouncedSearchTermValid]);

  useEffect(() => {
    const errorMessage = cn({
      ['Ничего не найдено']: debouncedSearchTermValid && !isLoading,
      ['Минимальное количество символов для поиска: 3']:
        !debouncedSearchTermValid && !isLoading,
      ['Загрузка...']: isLoading,
    });
    setErrorMessage(errorMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, catalogSearchRead]);

  return (
    <Container className={styles.mainContainer}>
      <Box className={styles.stickyButton}>
        <CustomButton onClick={handleClose} customStyles={styles.catalogButton}>
          <ArrowBackIosIcon />
          <p>Поиск</p>
        </CustomButton>
        <Divider className={styles.divider} />
        <Box className={styles.searchBox}>
          <TextField
            className={styles.textField}
            onChange={(event) => handleChangeInput(event)}
            value={searchValue}
            placeholder='Введите артикул, наименование или код запчасти'
          />
        </Box>
      </Box>
      {isCatalogSearchRead ? (
        <Box className={styles.searchReadBox}>
          {isCategorySearch && (
            <Box className={styles.categoryList}>
              <Typography className={styles.listTitle}>Категории</Typography>
              {categorySearch?.map((category) => {
                const link = `/catalog/${category.slug}`;

                return (
                  <Typography
                    onClick={() => handleClick(link)}
                    key={category.slug}
                    className={styles.categoryListItem}
                  >
                    {category.title}
                  </Typography>
                );
              })}
            </Box>
          )}
          {isProductSeacrh && (
            <Box className={styles.productsList}>
              <Typography className={styles.listTitle}>Товары</Typography>
              {productSeacrh?.map((product) => {
                // TODO: добавить при праи=вильной урле
                // const parentCategory = getParentCategory({
                //   categoriesTreeList,
                //   childrenCategorySlug: product.categories[0],
                // });

                const link = `/catalog/${product.categories[0]}/${product.slug}`;

                return (
                  <Box
                    className={styles.productItem}
                    key={product.slug}
                    onClick={() => handleClick(link)}
                  >
                    <CardMedia
                      component={'img'}
                      className={styles.productImage}
                      src={product.image}
                      height='70'
                      alt={product.title}
                    />
                    <Box className={styles.productTitleBox}>
                      <Typography className={styles.productTitle}>
                        {product.title}
                      </Typography>
                      <Typography className={styles.productPrice}>
                        Цена: {product.price}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      ) : (
        <Typography className={styles.errorMessage}>{errorMessage}</Typography>
      )}
    </Container>
  );
};

export { SearchMenuMobile };
