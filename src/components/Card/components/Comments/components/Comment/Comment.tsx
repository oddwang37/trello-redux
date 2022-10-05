import React, { FC, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useForm, FieldValues } from 'react-hook-form';

import { AvatarSvg } from 'components/svg';
import { useAppDispatch } from 'state/store';
import { editComment, deleteComment } from 'state/ducks/cards/slices';
import { InputField } from 'components';

interface FormValues extends FieldValues {
  comment: string;
}

const Comment: FC<CommentProps> = ({ id, cardId, text, date }) => {
  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      comment: '',
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue('comment', text);
  }, [text, setValue]);

  const onClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(deleteComment({ cardId, commentId: id }));
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const onSubmit = ({ comment }: FormValues) => {
    dispatch(editComment({ cardId, commentId: id, newText: comment }));
  };

  const onBlur = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <Root>
      <AvatarSvg />
      <div>
        <FlexWrapper>
          <Username>Username</Username>
          <Date>{date}</Date>
          <DeleteBtn onClick={onClickDelete}>Delete</DeleteBtn>
        </FlexWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField control={control} name="comment" onBlur={onBlur} onKeyDown={onEnterPress} />
        </form>
      </div>
    </Root>
  );
};

export default Comment;

type CommentProps = {
  id: string;
  cardId: string;
  text: string;
  date: string;
};
const Root = styled.div`
  display: flex;
  gap: 10px;
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Date = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;
const Username = styled.div`
  font-weight: 700;
  font-size: 14px;
`;
const EditBtn = styled(Date)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const DeleteBtn = styled(EditBtn)``;
