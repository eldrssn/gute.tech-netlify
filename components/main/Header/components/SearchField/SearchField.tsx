import React, { FC, useContext, useEffect, useState } from 'react';
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

import {
  fetchCatalogSearchRead,
  clearCatalogSearchRead,
} from 'store/reducers/catalog/actions';
import {
  selectCatalogSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { useDebounce } from 'hooks/useDebounce';
import { getParentCategory } from 'utility/helpers';

import { HeaderContext } from '../HeaderContext';
import styles from './styles.module.scss';
import { SearchFieldProps } from './types';

const SearchField: FC<SearchFieldProps> = ({ setIsFocusSearchField }) => {
  const { isFullHeader, isMobileView, isTabletView, isFocusSearchField } =
    useContext(HeaderContext);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const router = useRouter();
  const dispatch = useDispatch();
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
  const isCategorySearch = categorySearch
    ? Boolean(categorySearch.length)
    : false;
  const isProductSeacrh = productSeacrh ? Boolean(productSeacrh.length) : false;
  const isCatalogSearchRead = isCategorySearch || isProductSeacrh;

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

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(fetchCatalogSearchRead({ searchValue: debouncedSearchTerm }));
    }

    dispatch(clearCatalogSearchRead());
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    setIsFocusSearchField(false);
  }, [isFullHeader, isMobileView, isTabletView, setIsFocusSearchField]);

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
          placeholder='Введите артикул, наименование или код запчасти'
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
