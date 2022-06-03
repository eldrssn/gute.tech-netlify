import React, { useEffect, MouseEvent } from 'react';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.scss';

const ModalWrapper: React.FC<TOuterProps> = ({
  children,
  isOpen,
  setIsOpen,
  isCloseDisable,
}) => {
  const modalBackgroundClassName = cn(
    { [styles.modalOpen]: isOpen },
    styles.modalBackground,
  );

  const closeModal = () => {
    if (isCloseDisable) {
      return null;
    }

    return setIsOpen(false);
  };

  const onClickContent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const documentWidth = document.documentElement.clientWidth;
  const windowsWidth = window.innerWidth;
  const scrollbarWidth = windowsWidth - documentWidth;

  useEffect(() => {
    if (window) {
      window.document.body.style.overflow = isOpen ? 'hidden' : 'auto';
      document.body.style.marginRight = isOpen ? `${scrollbarWidth}px` : '0px';
    }
  }, [isOpen, scrollbarWidth]);

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
