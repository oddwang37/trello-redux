import React, { FC, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';

import { Overlay, CloseButton } from 'components';
import { Description, Comments } from './components';
import { InputField } from 'components';
import { CardSvg, BinSvg } from 'components/svg';
import { useAppDispatch, RootState } from 'state/store';
import { deleteCard, editCardTitle } from 'state/ducks/cards/slices';
import { selectCardById } from 'state/ducks/cards/selectors';
import { selectPopupCardId } from 'state/ducks/popupCard/selectors';
import { selectColumnOfCard } from 'state/ducks/columns/selectors';

interface TitleFormValues extends FieldValues {
  title: string;
}

const Card: FC<CardProps> = ({ isOpened, closeCard }) => {
  const cardId = useSelector(selectPopupCardId);
  const columnInfo = useSelector((state: RootState) => selectColumnOfCard(state, cardId));
  const cardInfo = useSelector((state: RootState) => selectCardById(state, cardId));
  const username = useSelector((state: RootState) => state.user.name);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, setValue } = useForm<TitleFormValues>({
    defaultValues: {
      title: '',
    },
  });

  const onClickDelete = () => {
    dispatch(deleteCard({ cardId, columnId: cardInfo?.id || '' }));
    closeCard();
  };

  useEffect(() => {
    cardInfo && setValue('title', cardInfo.title);
  }, [cardInfo, setValue]);

  useEffect(() => {
    const onKeyDown = (event: any) => {
      if (event.code === 'Escape') {
        closeCard();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const onSubmit = (data: TitleFormValues) => {
    if (cardInfo) {
      const oldHeading = cardInfo.title;
      if (data.title === '') {
        setValue('title', oldHeading);
      } else {
        dispatch(editCardTitle({ cardId: cardInfo.id, newTitle: data.title }));
      }
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleSubmit(onSubmit)();
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <>
      {cardInfo && (
        <Overlay isOpened={isOpened} onClick={closeCard}>
          <Root onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <FlexWrapper>
              <CardSvg />
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  control={control}
                  name="title"
                  onBlur={onBlur}
                  onKeyDown={onEnterPress}
                />
              </form>
            </FlexWrapper>
            <Info>
              In <ColumnTitle>{columnInfo?.heading}</ColumnTitle>
              <br />
              by {username}
            </Info>
            <Description cardId={cardId} description={cardInfo.description} />
            <Comments cardId={cardInfo.id} comments={cardInfo.comments} />
            <CloseButton closeModal={closeCard} />
            <DeleteButton onClick={onClickDelete}>
              <BinSvg />
            </DeleteButton>
          </Root>
        </Overlay>
      )}
    </>
  );
};

export default Card;

type CardProps = {
  isOpened: boolean;
  closeCard: () => void;
};
const Root = styled.div`
  width: 45vw;
  height: 85vh;
  padding: 20px 0 20px 40px;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Info = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin: 6px 0 20px 30px;
`;
const ColumnTitle = styled.span`
  text-decoration: underline;
`;
const DeleteButton = styled.div`
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 45px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  height: 30px;
  padding: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;
