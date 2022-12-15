import { NextPage } from 'next';

const Error: NextPage<{ statusCode?: number; message?: string }> = ({
  statusCode,
  message,
}) => (
  <p>
    {statusCode
      ? `На сервере возникла ошибка ${statusCode} с информацией ${message}`
      : `Ошибка возникла на клиенте`}
  </p>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err?.message;

  return { statusCode, message };
};

export default Error;
