import React, { FC } from 'react';

import { TabProps } from 'types/product';

const TabDefault: FC<TabProps> = ({ content }) => {
  const isHTML =
    typeof content === 'string' &&
    content.startsWith('<') &&
    content.endsWith('>');

  const contentBody = isHTML ? (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <p>{content}</p>
  );

  return content ? contentBody : <p>Нет данных</p>;
};

export { TabDefault };
