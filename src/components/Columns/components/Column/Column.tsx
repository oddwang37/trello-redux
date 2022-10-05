import React, { FC, useEffect, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useForm, FieldValues } from 'react-hook-form';

import { RootState } from 'state/store';
import { cardsSelectors } from 'state/ducks/cards';
import { CardPreview, SaveButton } from 'components';
import { useAppDispatch } from 'state/store';
import { editColumnHeading } from 'state/ducks/columns/slices';
import { addCard } from 'state/ducks/cards/slices';
import { v4 as uuid } from 'uuid';
import { InputField } from 'components';

interface FormValues extends FieldValues {
  addingCard: string;
}

interface HeadingFormValues extends FieldValues {
  heading: string;
}

const Column: FC<ColumnProps> = ({ id, heading, openCard }) => {
  const {
    handleSubmit: handleSubmitAddingCard,
    control: addingCardControl,
    reset: resetAddingCard,
  } = useForm<FormValues>({
    defaultValues: {
      cardName: '',
    },
  });
  const {
    handleSubmit: handleSubmitHeading,
    control: headingControl,
    setValue: setHeadingValue,
  } = useForm<HeadingFormValues>({
    defaultValues: {
      heading: '',
    },
  });
  const cards = useSelector((state: RootState) => cardsSelectors.selectCardsForColumn(state, id));
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const onSubmitAdding = (data: FormValues) => {
    if (data.cardName) {
      dispatch(addCard({ columnId: id, title: data.cardName, id: uuid() }));
      resetAddingCard();
      setIsEditable(false);
    }
  };

  const onSubmitHeading = (data: HeadingFormValues) => {
    const prevHeading = heading;
    if (data.heading === '') {
      dispatch(editColumnHeading({ columnId: id, newHeading: prevHeading }));
      setHeadingValue('heading', heading);
    } else {
      dispatch(editColumnHeading({ columnId: id, newHeading: data.heading }));
    }
  };
  const onBlurHeading = () => {
    handleSubmitHeading(onSubmitHeading)();
  };

  useEffect(() => {
    setHeadingValue('heading', heading);
  }, [heading, setHeadingValue]);

  const onEnterPressHeading = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const onEnterPressAddingCard = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      handleSubmitAddingCard(onSubmitAdding)();
    }
  };

  return (
    <Root>
      <form onSubmit={handleSubmitHeading(onSubmitHeading)}>
        <InputField
          control={headingControl}
          name="heading"
          onKeyDown={onEnterPressHeading}
          onBlur={onBlurHeading}
        />
      </form>
      <Content>
        {cards.map((item) => (
          <CardPreview
            title={item.title}
            cardId={item.id}
            columnId={id}
            key={item.id}
            commentsQ={item.comments.length}
            openCard={openCard}
          />
        ))}
        {isEditable ? (
          <AddingCardForm onSubmit={handleSubmitAddingCard(onSubmitAdding)}>
            <InputField
              control={addingCardControl}
              name="cardName"
              rules={{ required: true }}
              onKeyDown={onEnterPressAddingCard}
            />
            <ButtonsWrapper>
              <SaveButton>Create</SaveButton>
              <CancelAdding onClick={disableEdit}>
                <div>&times;</div>
              </CancelAdding>
            </ButtonsWrapper>
          </AddingCardForm>
        ) : (
          <AddCard onClick={enableEdit}>
            <Plus>+</Plus>
            <div>Add card</div>
          </AddCard>
        )}
      </Content>
    </Root>
  );
};

export default Column;

type ColumnProps = {
  id: string;
  heading: string;
  openCard: () => void;
};

const Content = styled.div`
  padding: 12px 8px 8px 8px;
`;

const Root = styled.div`
  width: 22%;
  background-color: #fff;
  border-radius: 6px;
  align-self: flex-start;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
`;

const AddCard = styled.div`
  height: 32px;
  padding: 5px 14px;
  background-color: #fff;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2;
  }
`;
const AddingCardForm = styled.form``;
const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CancelAdding = styled.div`
  font-weight: 500;
  font-size: 28px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Plus = styled.div`
  font-size: 28px;
  color: #7a7a7a;
`;
