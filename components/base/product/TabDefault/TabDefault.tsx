import React, { FC } from 'react';

import { TabProps } from 'types/product';

const TabDefault: FC<TabProps> = ({ content }) =>
  content ? <p>{content}</p> : <p>Нет данных</p>;

export { TabDefault };
