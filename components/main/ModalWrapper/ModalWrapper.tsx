import React, { useEffect, MouseEvent } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import dynamic from 'next/dynamic';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.scss';

const AriaModal = dynamic(() => import('react-aria-modal'));

const ModalWrapper: React.FC<TOuterProps> = ({
  children,
  isOpen,
  setIsOpen,
  isCloseDisable,
  modalTitle,
  initialFocus,
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
    if (!closeByEsc) {
      return;
    }

    document.body.addEventListener('keydown', handlePressEscClose);
    document.body.style.marginRight = `${widthScrollBar}px`;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeEventListener('keydown', handlePressEscClose);
      document.body.style.overflow = 'auto';
      document.body.style.marginRight = '0px';
    };
  });

  return (
    <AriaModal
      titleText={modalTitle}
      underlayStyle={{ zIndex: 1102 }}
      mounted={isOpen}
      initialFocus={initialFocus}
      scrollDisabled={false}
    >
      <div className={modalBackgroundClassName} onClick={closeModal}>
        <div className={styles.modal}>
          <div className={styles.content} onClick={onClickContent}>
            {children}
          </div>
        </div>
      </div>
    </AriaModal>
  );
};

export { ModalWrapper };
