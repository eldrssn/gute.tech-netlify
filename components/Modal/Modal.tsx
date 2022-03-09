import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.css';

type TProps = TOuterProps;

const View: React.FC<TProps> = ({
  children,
  isOpen,
  setIsOpen,
  isCloseDisable,
}) => {
  const modalBackgroundClassName = cn(
    isOpen && styles.modalOpen,
    styles.modalBackground,
  );

  useEffect(() => {
    window.document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div
      className={modalBackgroundClassName}
      onClick={() => !isCloseDisable && setIsOpen(false)}
    >
      <div className={styles.modal}>
        <div
          className={styles.content}
          onClick={(setIsOpen) => setIsOpen.stopPropagation()}
        >
          {!isCloseDisable && (
            <div className={styles.closeModal} onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default View;
