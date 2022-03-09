import React, { useEffect, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { TOuterProps } from './types';

import styles from './styles.module.css';

const View: React.FC<TOuterProps> = ({
  children,
  isOpen,
  setIsOpen,
  isCloseDisable,
}) => {
  const modalBackgroundClassName = cn(
    isOpen && styles.modalOpen,
    styles.modalBackground,
  );

  const onClickBackground = () => {
    if (isCloseDisable) {
      return null;
    }

    return setIsOpen(false);
  };

  const onClickContent = (event: MouseEvent<HTMLElement>) =>
    event.stopPropagation();

  useEffect(() => {
    window.document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <div className={modalBackgroundClassName} onClick={onClickBackground}>
      <div className={styles.modal}>
        <div className={styles.content} onClick={onClickContent}>
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
