import { ArrowButton } from './types';
import styles from './arrowButtons.module.scss';

const PrevArrowButton = ({ onClick }: ArrowButton) => {
  return (
    <div
      className={[styles.arrowButton, styles.prevArrow].join(' ')}
      onClick={onClick}
    />
  );
};

export { PrevArrowButton };
