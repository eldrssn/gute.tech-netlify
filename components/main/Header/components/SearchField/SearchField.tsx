import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  MenuItem,
  Box,
  TextField,
  Typography,
  Divider,
  CardMedia,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { clearTransportId } from 'store/reducers/transport/actions';
import {
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
} from 'store/reducers/catalog/actions';
import {
  selectCatalogSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { useDebounce } from 'hooks/useDebounce';
import { useWindowSize } from 'hooks/useWindowSize';
import { getParentCategory } from 'utility/helpers';

import { HeaderContext } from '../HeaderContext';

import styles from './styles.module.scss';

const SearchField: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
  const { data: categoriesTreeListData } = useSelector(
    selectCategoriesTreeList,
  );
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
    setFieldIsFocus(false);
    router.push(link);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullHeader, isMobile, isTablet, setFieldIsFocus]);

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
      >
        {isCatalogSearchRead ? (
          <>
            {isCategorySearch && (
              <Box className={styles.categoryList}>
                <Typography className={styles.listTitle}>Категории</Typography>
                {categorySearch?.map((category) => {
                  const parentCategory = getParentCategory({
                    categoriesTreeListData,
                    childrenCategorySlug: category.slug,
                  });
                  const link = `/catalog/${parentCategory}/${category.slug}`;

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
                  const parentCategory = getParentCategory({
                    categoriesTreeListData,
                    childrenCategorySlug: product.categories[0],
                  });

                  const link = `/catalog/${parentCategory}/${product.categories[0]}/${product.slug}`;

                  return (
                    <Box
                      className={styles.productItem}
                      key={product.slug}
                      onClick={() => handleClick(link)}
                    >
                      <CardMedia
                        component={'img'}
                        className={styles.productImage}
                        src={product.image || '/images/no-image.jpeg'}
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
