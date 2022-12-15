import React, { KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';
import { useForm, useController } from 'react-hook-form';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { FormInput } from 'components/main/FormInput';
import { getProductSlugQuery } from 'components/base/product/helpers';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { handleEnterPress } from 'utility/utils';
import { postProductReview } from 'api/routes/product';
import { fetchProductReviewsList } from 'store/reducers/product/actions';

import { TFormData, TOuterProps } from './types';
import styles from './modalAddProductReview.module.scss';

const ModalAddProductReview: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleSubmit, control, resetField, setError } = useForm<TFormData>();
  const grade = useController({
    name: 'grade',
    control,
    rules: { required: true },
  });

  const comment = useController({
    name: 'comment',
    control,
  });

  const productSlug = getProductSlugQuery(router);

  const showcase = useSelector(selectShowcaseData);

  const closeModal = () => {
    setIsOpen(false);
    resetField('grade');
    resetField('comment');
  };

  const onSubmit = handleSubmit((data) => {
    const { grade, comment } = data;

    if (grade) {
      postProductReview({
        productSlug,
        grade,
        comment,
      })
        .then(() => {
          closeModal();
          resetField('grade');
          resetField('comment');
          dispatch(fetchProductReviewsList({ productSlug }));
        })
        .catch(() => {
          setError('comment', {
            type: 'custom',
            message: 'Не удалось отправить отзыв, попробуйте еще раз',
          });
        });
    }
  });

  const privacyPolicyLink = showcase.privacyPolicyLink;

  const handlePressEnterCloseModal = (event: KeyboardEvent) => {
    handleEnterPress(event, closeModal);
  };

  console.log('grade.fieldState.error', grade.fieldState.error);

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={closeModal} modalTitle='review'>
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          tabIndex={0}
          onKeyPress={handlePressEnterCloseModal}
        >
          <CloseIcon />
        </Box>
        <form onSubmit={onSubmit} className={styles.container}>
          <Typography
            className={styles.title}
            id='modal-modal-title'
            variant='h6'
            component='h2'
            mb={1}
          >
            Оставить отзыв
          </Typography>

          <>
            <Box component='div' className={styles.inputBox}>
              <Box className={styles.inputContainer}>
                <p className={styles.ratingLabel}>Ваша оценка товара: </p>
                <Rating
                  value={Number(grade.field.value)}
                  onChange={grade.field.onChange}
                />
                {grade.fieldState.error && (
                  <p className={styles.ratingError}>Поставьте оценку</p>
                )}
              </Box>
            </Box>
            <Box
              className={cn(styles.textAreaContainer, {
                [styles.inputIsError]: Boolean(comment.fieldState.error),
              })}
            >
              <FormInput
                helperText={comment.fieldState.error?.message}
                onChange={comment.field.onChange}
                value={comment.field.value ? comment.field.value : ''}
                label='Введите ваш отзыв'
                isError={Boolean(comment.fieldState.error)}
                textarea
                maxLength={1000}
              />
              <Typography
                className={cn(styles.footnote, {
                  [styles.footnoteErrorActive]: Boolean(
                    comment.fieldState.error,
                  ),
                })}
              >
                максимальное количество символов 1000
              </Typography>

              {comment.fieldState.error && (
                <Typography
                  className={cn(styles.footerror, {
                    [styles.footnoteErrorActive]: Boolean(
                      comment.fieldState.error,
                    ),
                  })}
                >
                  {comment.fieldState.error.message}
                </Typography>
              )}
            </Box>
          </>
          <Button onClick={onSubmit} variant={'contained'}>
            Отправить
          </Button>
          <Typography
            className={styles.policy}
            id='modal-modal-title'
            component='p'
            mb={1}
          >
            Нажимая на кнопку «Отправить», вы даете согласие на обработку даных
            и соглашаетесь с{' '}
            <Link href={privacyPolicyLink ? privacyPolicyLink : ''}>
              политикой конфиденциальности.
            </Link>
          </Typography>
        </form>
      </Container>
    </ModalWrapper>
  );
};

export { ModalAddProductReview };
