import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchShowcase } from 'store/reducers/showcase/actions';

const InitialLoader: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowcase());
  }, [dispatch]);

  return <>{children}</>;
};

export { InitialLoader };
