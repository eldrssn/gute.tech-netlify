import React, { FC } from 'react';

import { TabProps as Props } from 'types/productTypes';

export const TabDefault: FC<Props> = ({ content }) => <p>{content}</p>;
