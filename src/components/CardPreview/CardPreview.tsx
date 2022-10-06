import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { EditSvg } from 'components/svg';
import { SaveButton } from 'components';
import { useAppDispatch } from 'state/store';
import { editCardTitle } from 'state/ducks/cards/slices';
import { setPopupCardId } from 'state/ducks/popupCard/slices';
import { useForm, FieldValues } from 'react-hook-form';

import { InputField } from 'components';

interface FormValues extends FieldValues {
  cardTitle: string;
}

const CardPreview: FC<CardPreviewProps> = ({ title, columnId, cardId, commentsQ, openCard }) => {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { cardTitle: '' },
  });
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const onSubmit = (data: FormValues) => {
    dispatch(editCardTitle({ cardId, newTitle: data.cardTitle }));
    disableEdit();
  };

  const onClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    enableEdit();
  };

  const onClickCard = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setPopupCardId(cardId));
    openCard();
  };

  useEffect(() => {
    setValue('cardTitle', title);
  }, [title, setValue]);

  /*  const onFocusCursorToEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const oldText = textareaVal;
    e.target.value = '';
    e.target.value = oldText;
  }; */

  return (
    <>
      {isEditable ? (
        <EditForm onSubmit={handleSubmit(onSubmit)}>
          <InputField control={control} name="cardTitle" rules={{ required: true }} />
          <SaveButton>Save</SaveButton>
        </EditForm>
      ) : (
        <Title onClick={onClickCard}>
          {title}
          <EditButton onClick={onClickEdit}>
            <EditSvg />
          </EditButton>
          {commentsQ > 0 ? <Comments>{commentsQ} comments</Comments> : null}
        </Title>
      )}
    </>
  );
};

export default CardPreview;

type CardPreviewProps = {
  title: string;
  columnId: string;
  cardId: string;
  commentsQ: number;
  openCard: () => void;
};

const Title = styled.div`
  min-height: 46px;
  width: 100%;
  padding: 5px 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const EditButton = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3px;
  right: 5px;
  background-color: #eeeeee;
  &:hover {
    background-color: #c9c9c9;
  }
`;
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const Comments = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
`;
