import React, { useEffect, MouseEvent } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.scss';

const ModalWrapper: React.FC<TOuterProps> = ({
  children,
  isOpen,
  setIsOpen,
  isCloseDisable,
  closeByEsc = true,
}) => {
  const { width: widthScrollBar } = useScrollbarSize();

  const closeModal = () => {
    if (isCloseDisable) {
      return null;
    }

    return setIsOpen(false);
  };

  const handlePressEscClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const onClickContent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const modalBackgroundClassName = cn(
    { [styles.modalOpen]: isOpen },
    styles.modalBackground,
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.marginRight = `${widthScrollBar}px`;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
  }, [isOpen, widthScrollBar]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.marginRight = '0px';
    };
  }, []);

  useEffect(() => {
    if (!closeByEsc) {
      return;
    }

    document.body.addEventListener('keydown', handlePressEscClose);

    return () =>
      document.body.removeEventListener('keydown', handlePressEscClose);
  });

  return (
    <div className={modalBackgroundClassName} onClick={closeModal}>
      <div className={styles.modal}>
        <div className={styles.content} onClick={onClickContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { ModalWrapper };
