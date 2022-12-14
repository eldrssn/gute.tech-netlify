/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
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
import { useArrowNavigation } from 'hooks/useArrowNavigation';

import { HeaderContext } from '../HeaderContext';

import { checkResultList } from './helpers';
import styles from './styles.module.scss';

const SearchField: FC = () => {
  const dispatch = useDispatch();

  const { isMobile, isTablet } = useWindowSize();
  const { isFullHeader } = useContext(HeaderContext);
  let { isFocusSearchField, setIsFocusSearchField } = useContext(HeaderContext);

  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const popupRef = useRef<HTMLDivElement | null>(null);
  const isResult = checkResultList(popupRef);

  const searchFieldRef = useArrowNavigation({
    selectors: 'a',
  });

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

  const handleClosePopover = () => {
    setFieldIsFocus(false);
    setSearchValue('');
  };

  const handleEnter = () => {
    handleClosePopover();
    dispatch(clearTransportId());
  };

  const handleOpenPopover = () => {
    setFieldIsFocus(true);
  };

  const handleBlur = () => {
    if (!isResult) {
      setFieldIsFocus(false);
    }
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
      ['???????????? ???? ??????????????']: debouncedSearchTermValid && !isLoading,
      ['?????????????????????? ???????????????????? ???????????????? ?????? ????????????: 3']:
        !debouncedSearchTermValid && !isLoading,
      ['????????????????...']: isLoading,
    });
    setErrorMessage(errorMessage);
  }, [debouncedSearchTerm, catalogSearchRead]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClosePopover();
    }

    if (event.key === 'Enter') {
      handleEnter();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Box
      className={styles.searchMenuItem}
      ref={searchFieldRef}
      onBlur={handleBlur}
    >
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
          placeholder='?????????????? ??????????????, ???????????????????????? ?????? ?????? ????????????????'
          value={searchValue}
          onFocusCapture={handleOpenPopover}
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
        ref={popupRef}
      >
        {isCatalogSearchRead ? (
          <>
            {isCategorySearch && (
              <Box className={styles.categoryList}>
                <Typography className={styles.listTitle}>??????????????????</Typography>
                {categorySearch?.map((category) => {
                  const categories = category.categories;
                  const link = getLinkToCategory({
                    categories: categories,
                  });

                  return (
                    <Link href={link} key={category.slug}>
                      <a className={styles.categoryListItem_box}>
                        <Typography
                          onClick={handleClosePopover}
                          className={styles.categoryListItem}
                        >
                          {category.title}
                        </Typography>
                      </a>
                    </Link>
                  );
                })}
              </Box>
            )}
            {isProductSeacrh && (
              <Box className={styles.productsList}>
                <Typography className={styles.listTitle}>????????????</Typography>
                {productSeacrh?.map((product) => {
                  const categories = product.categories[0];
                  const productSlug = product.slug;
                  const link = getLinkToProduct({
                    categories: categories,
                    productSlug: productSlug,
                  });

                  return (
                    <Link href={link} key={product.slug}>
                      <a
                        className={styles.productItem}
                        onClick={handleClosePopover}
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
                            ????????: {product.price}
                          </Typography>
                        </Box>
                      </a>
                    </Link>
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
    </Box>
  );
};

export { SearchField };
