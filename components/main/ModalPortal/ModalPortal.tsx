import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal: FC = ({ children }) => {
  const el = document.createElement('div');
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    modalRoot?.appendChild(el);

    return () => {
      modalRoot?.removeChild(el);
    };
  }, [modalRoot, el]);

  return createPortal(children, el);
};

export { ModalPortal };
