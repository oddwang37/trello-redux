import React, { FC, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useForm, FieldValues } from 'react-hook-form';

import { CommentsSvg, AvatarSvg } from 'components/svg';
import {
  SaveButton,
  CancelButton,
  ButtonsWrapper,
} from 'components/Card/components/Description/Description';
import { Comment } from './components';
import { useAppDispatch } from 'state/store';
import { addComment } from 'state/ducks/cards/slices';
import { InputField } from 'components';

interface FormValues extends FieldValues {
  comment: string;
}

const Comments: FC<CommentsProps> = ({ cardId, comments }) => {
  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });

  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit);
    }
  };

  const onSubmit = ({ comment }: FormValues) => {
    dispatch(addComment({ cardId, text: comment }));
    disableEdit();
    setValue('comment', '');
  };

  return (
    <>
      <FlexWrapper>
        <CommentsSvg />
        <Title>Comments</Title>
      </FlexWrapper>
      <InputWrapper>
        <AvatarSvg />
        {isEditable ? (
          <CommentForm onSubmit={handleSubmit(onSubmit)}>
            <InputField control={control} name="comment" onKeyDown={onEnterPress} autoFocus />
            <ButtonsWrapper>
              <SaveButton>Send</SaveButton>
              <CancelButton onClick={disableEdit}>Cancel</CancelButton>
            </ButtonsWrapper>
          </CommentForm>
        ) : (
          <CommentButton onClick={enableEdit}>Add a comment...</CommentButton>
        )}
      </InputWrapper>
      {comments ? (
        <CommentsSection>
          {comments.map((item) => (
            <Comment id={item.id} cardId={cardId} text={item.text} date={item.date} key={item.id} />
          ))}
        </CommentsSection>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Comments;

type CommentsProps = {
  cardId: string;
  comments?: { text: string; date: string; id: string }[];
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const CommentForm = styled.form``;
const CommentButton = styled.div`
  width: 450px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const InputWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`;
const CommentsSection = styled.div`
  height: 30%;
  margin-top: 15px;
  overflow-y: scroll;
`;
