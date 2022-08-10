import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';

const Description: FC = () => {
  const { description, tagline } = useSelector(selectShowcaseData);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: tagline }}></div>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </>
  );
};

export { Description };
