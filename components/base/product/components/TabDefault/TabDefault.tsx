import React, { FC } from 'react';

import { TabProps } from 'types/product';

const TabDefault: FC<TabProps> = ({ content, className }) => {
  const isHTML =
    typeof content === 'string' &&
    content.startsWith('<') &&
    content.endsWith('>');

  const contentBody = isHTML ? (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <p className={className}>{content}</p>
  );

  return content ? contentBody : <p>Нет данных</p>;
};

export { TabDefault };
