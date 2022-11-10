import React, { useEffect, MouseEvent } from 'react';
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

    return () => {
      document.body.removeEventListener('keydown', handlePressEscClose);
    };
  });

  return (
    <AriaModal
      titleText={modalTitle}
      underlayStyle={{ zIndex: 1102 }}
      mounted={isOpen}
      initialFocus={initialFocus}
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
