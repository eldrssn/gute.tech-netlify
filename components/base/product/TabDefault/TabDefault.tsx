import React, { FC } from 'react';

import { TabProps } from 'types/productTypes';

export const TabDefault: FC<TabProps> = ({ content }) => <p>{content}</p>;
