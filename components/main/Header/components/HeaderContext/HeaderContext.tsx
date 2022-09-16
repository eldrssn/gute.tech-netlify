import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTransportStore } from 'store/reducers/transport/selectors';

import { getYearsInfo } from '../../helpers';

import { HeaderContentType } from './types';

const HeaderContext = React.createContext<HeaderContentType>({
  isFullHeader: true,
  isFocusSearchField: false,
  setIsFocusSearchField: () => false,
  setTransportText: () => '',
  transportText: '',
});

const HeaderContextProvider: React.FC = ({ children }) => {
  const [isFullHeader, setIsFullHeader] = useState<boolean>(true);
  const [isFocusSearchField, setIsFocusSearchField] = useState(false);
  const [transportText, setTransportText] = useState<string>('');

  const transport = useSelector(selectTransportStore);
  const { transportInfo, transportId } = transport;

  useEffect(() => {
    const onScroll = () => {
      if (document) {
        const { scrollTop } = document.documentElement;

        setIsFullHeader(() => !scrollTop);
      }
    };

    window?.addEventListener('scroll', onScroll, false);

    return () => {
      window?.removeEventListener('scroll', onScroll, false);
    };
  }, []);

  useEffect(() => {
    if (!transportInfo.data) {
      return;
    }

    const { brand, years, engine, model } = transportInfo.data;
    const yearsInfo = getYearsInfo(years);

    const transportText = transportId
      ? `${brand.title} ${model.title} ${yearsInfo} ${engine.title}`
      : '';

    setTransportText(transportText);
  }, [transportInfo, transportId]);

  const value = useMemo(
    () => ({
      isFocusSearchField,
      isFullHeader,
      setIsFocusSearchField,
      setTransportText,
      transportText,
    }),
    [
      isFullHeader,
      isFocusSearchField,
      setIsFocusSearchField,
      transportText,
      setTransportText,
    ],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export { HeaderContextProvider, HeaderContext };
