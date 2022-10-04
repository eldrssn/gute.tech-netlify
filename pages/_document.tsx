/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from 'next/document';

import { MetrikScript } from 'utility/utils/metriks';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <MetrikScript />
      </body>
    </Html>
  );
}
