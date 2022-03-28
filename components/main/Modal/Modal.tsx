import React, { useEffect, MouseEvent } from 'react';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.scss';

const View: React.FC<TOuterProps> = ({
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

  useEffect(() => {
    if (window) {
      window.document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }, [isOpen]);

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

export default View;
