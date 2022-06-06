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
}) => {
  const { width: widthScrollBar } = useScrollbarSize();

  const closeModal = () => {
    if (isCloseDisable) {
      return null;
    }

    return setIsOpen(false);
  };

  const onClickContent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const modalBackgroundClassName = cn(
    { [styles.modalOpen]: isOpen },
    styles.modalBackground,
  );

  console.log(document.body.style.marginRight);

  useEffect(() => {
    if (isOpen) {
      document.body.style.marginRight = `${widthScrollBar}px`;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
  }, [isOpen, widthScrollBar]);

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
