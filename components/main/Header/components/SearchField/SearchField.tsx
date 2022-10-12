/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';

import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { clearTransportId } from 'store/reducers/transport/actions';
import {
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
} from 'store/reducers/catalog/actions';
import { selectCatalogSearchRead } from 'store/reducers/catalog/selectors';
import {
  getLinkToProduct,
  getLinkToCategory,
} from 'utility/helpers/linkmakers';
import { useDebounce } from 'hooks/useDebounce';
import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContext } from '../HeaderContext';

import styles from './styles.module.scss';

const SearchField: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isMobile, isTablet } = useWindowSize();
  const { isFullHeader } = useContext(HeaderContext);
  let { isFocusSearchField, setIsFocusSearchField } = useContext(HeaderContext);

  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  if (isMobile) {
    setIsFocusSearchField = setIsFocusSearch;
    isFocusSearchField = isFocusSearch;
  }

  const catalogSearchRead = useSelector(selectCatalogSearchRead);

  const debouncedSearchTerm = useDebounce(
    searchValue,
    searchValue.length >= 3 ? 500 : 1,
  );

  const categorySearch = catalogSearchRead.data?.categories;
  const productSeacrh = catalogSearchRead.data?.products;

  const debouncedSearchTermValid = debouncedSearchTerm.length >= 3;
  const isLoading = catalogSearchRead.isLoading;
  const isActivePopup = isFocusSearchField && debouncedSearchTermValid;
  const isCategorySearch = categorySearch ? categorySearch.length > 0 : false;
  const isProductSeacrh = productSeacrh ? productSeacrh.length > 0 : false;
  const isCatalogSearchRead = isCategorySearch || isProductSeacrh;

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const setFieldIsFocus = useCallback(
    (value: boolean) => {
      if (setIsFocusSearchField) {
        setIsFocusSearchField(value);
      }
    },
    [setIsFocusSearchField],
  );

  const handleClick = (link: string) => {
    router.push(link);
    setFieldIsFocus(false);
    setSearchValue('');
    dispatch(clearTransportId());
  };

  const handleClosePopover = () => {
    setFieldIsFocus(false);
    setSearchValue('');
  };

  const handleOpenPopover = () => {
    setFieldIsFocus(true);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(fetchCatalogSearchRead({ searchValue: debouncedSearchTerm }));
    }

    dispatch(clearCatalogSearchRead());
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    setFieldIsFocus(false);
  }, [isFullHeader, isMobile, isTablet, setFieldIsFocus]);

  useEffect(() => {
    const errorMessage = cn({
      ['Ничего не найдено']: debouncedSearchTermValid && !isLoading,
      ['Минимальное количество символов для поиска: 3']:
        !debouncedSearchTermValid && !isLoading,
      ['Загрузка...']: isLoading,
    });
    setErrorMessage(errorMessage);
  }, [debouncedSearchTerm, catalogSearchRead]);

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
          [styles.searchBoxSmallHeader]: isMobile,
        })}
      >
        <TextField
          className={styles.textField}
          inputProps={{ type: 'text' }}
          onChange={handleChangeInput}
          onClick={handleOpenPopover}
          placeholder='Введите артикул, наименование или код запчасти'
          value={searchValue}
          onFocusCapture={handleOpenPopover}
          onBlur={handleClosePopover}
          type='text'
          autoComplete='off'
        />
        <SearchIcon className={styles.searchIcon} onClick={handleOpenPopover} />
        {isFocusSearchField && (
          <Divider
            className={cn(styles.divider, {
              [styles.dividerSmallHeader]: !isFullHeader,
            })}
          />
        )}
      </Box>

      <Box
        className={cn(styles.popupBox, {
          [styles.activePopupBox]: isActivePopup,
          [styles.errorPopupBox]: !isCatalogSearchRead && isFocusSearchField,
          [styles.popupBoxSmallHeader]: !isFullHeader,
        })}
        tabIndex={0}
      >
        {isCatalogSearchRead ? (
          <>
            {isCategorySearch && (
              <Box className={styles.categoryList}>
                <Typography className={styles.listTitle}>Категории</Typography>
                {categorySearch?.map((category) => {
                  const categories = category.categories;
                  const link = getLinkToCategory({
                    categories: categories,
                  });

                  return (
                    <Typography
                      onClick={() => handleClick(link)}
                      key={category.slug}
                      className={styles.categoryListItem}
                      tabIndex={0}
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
                  const categories = product.categories[0];
                  const productSlug = product.slug;
                  const link = getLinkToProduct({
                    categories: categories,
                    productSlug: productSlug,
                  });

                  return (
                    <Box
                      className={styles.productItem}
                      key={product.slug}
                      tabIndex={0}
                      onClick={() => handleClick(link)}
                    >
                      <CardMedia
                        component={'img'}
                        className={styles.productImage}
                        src={product.image || '/images/no-image.jpeg'}
                        height='70'
                        width='70'
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
          </>
        ) : (
          <Typography className={styles.errorMessage}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </MenuItem>
  );
};

export { SearchField };
