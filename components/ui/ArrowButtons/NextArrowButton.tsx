import { ArrowButton } from './types';
import styles from './arrowButtons.module.css';

export const NextArrowButton = ({ onClick }: ArrowButton) => {
  return (
    <div
      className={[styles.arrowButton, styles.nextArrow].join(' ')}
      onClick={onClick}
    />
  );
};
