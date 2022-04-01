import React, { FC } from 'react';

import { TabProps } from 'types/product';

export const TabDefault: FC<TabProps> = ({ content }) => <p>{content}</p>;
