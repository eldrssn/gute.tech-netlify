import React, { FC, useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { MenuItem, Box, TextField, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
} from 'store/reducers/catalog/actions';
import {
  selectCatalogSearchRead,
  // selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
// import { getParentCategory } from 'utility/helpers'; TODO: добавить при праи=вильной урле

import { HeaderContext } from '../HeaderContext';
import styles from './styles.module.scss';
import { SearchFieldProps } from './types';

const SearchField: FC<SearchFieldProps> = ({ setIsFocusSearchField }) => {
  const { isFullHeader, isMobileView, isTabletView, isFocusSearchField } =
    useContext(HeaderContext);
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const catalogSearchRead = useSelector(selectCatalogSearchRead);
  // const categoriesTreeList = useSelector(selectCategoriesTreeList); TODO: добавить при праи=вильной урле

  const categorySearch = catalogSearchRead.data?.categories;
  const productSeacrh = catalogSearchRead.data?.products;

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const handleClick = (link: string) => {
    router.push(link);
    setIsFocusSearchField(false);
    setSearchValue('');
  };

  const handleClosePopover = () => {
    setIsFocusSearchField(false);
    setSearchValue('');
  };

  const handleOpenPopover = () => {
    setIsFocusSearchField(true);
  };

  const searchValueValid = searchValue.length >= 3;

  useEffect(() => {
    if (searchValueValid) {
      dispatch(fetchCatalogSearchRead({ searchValue }));
      return;
    }

    dispatch(clearCatalogSearchRead());
  }, [searchValue, dispatch, searchValueValid]);

  useEffect(() => {
    setIsFocusSearchField(false);
  }, [isFullHeader, isMobileView, isTabletView, setIsFocusSearchField]);

  const isLoading = catalogSearchRead.isLoading;
  const isActivePopup = isFocusSearchField && searchValueValid;
  const isCategorySearch = categorySearch
    ? Boolean(categorySearch.length)
    : false;
  const isProductSeacrh = productSeacrh ? Boolean(productSeacrh.length) : false;
  const isCatalogSearchRead = isCategorySearch || isProductSeacrh || isLoading;

  if (!isFullHeader && isMobileView) {
    return null;
  }

  return (
    <MenuItem disableGutters className={styles.searchMenuItem}>
      {isFocusSearchField && (
        <Box
          component='div'
          className={styles.background}
          onClick={handleClosePopover}
        />
      )}
      <Box
        className={cn(styles.searchBox, {
          [styles.activeSearchBox]: isActivePopup,
        })}
      >
        <TextField
          className={styles.textField}
          onChange={(event) => handleChangeInput(event)}
          onClick={handleOpenPopover}
          placeholder='Поиск...'
          value={searchValue}
        />
        <SearchIcon className={styles.searchIcon} />
        {isFocusSearchField && <Divider className={styles.divider} />}
      </Box>
      <Box
        className={cn(styles.popupBox, {
          [styles.activePopupBox]: isActivePopup,
          [styles.errorPopupBox]: !isCatalogSearchRead && isFocusSearchField,
        })}
      >
        {isCatalogSearchRead ? (
          <>
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
                    <Image
                      className={styles.productImage}
                      src={product.image}
                      width={70}
                      height={70}
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
          </>
        ) : (
          <Typography className={styles.errorMessage}>
            {searchValueValid
              ? 'Ничего не найдено'
              : 'Минимальное количество символов для поиска: 3'}
          </Typography>
        )}
      </Box>
    </MenuItem>
  );
};

export { SearchField };
