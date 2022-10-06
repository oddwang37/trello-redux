import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { DescriptionSvg } from 'components/svg';
import { useAppDispatch } from 'state/store';
import { editDescription, deleteDescription } from 'state/ducks/cards/slices';
import { InputField } from 'components';

interface FormValues {
  description: string;
}

const Description: FC<DescriptionProps> = ({ cardId, description = '' }) => {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      description: '',
    },
  });

  const enableEdit = () => {
    setValue('description', description);
    setIsEditable(true);
  };

  const disableEdit = () => setIsEditable(false);

  /*  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter') {
      saveDescription();
    }
  }; */

  useEffect(() => {
    setValue('description', description);
  }, [description, setValue]);

  const onFocusCursorToEnd = (e: React.FocusEvent<HTMLInputElement>) => {
    const text = e.target.value;
    e.target.value = '';
    e.target.value = text;
  };

  const onSubmit = (data: FormValues) => {
    dispatch(editDescription({ cardId, newDescription: data.description }));
    setValue('description', '');
    disableEdit();
  };

  const StaticDescription = () => {
    return description ? (
      <DescriptionText>{description}</DescriptionText>
    ) : (
      <DescriptionButton onClick={enableEdit}>Add more detailed description...</DescriptionButton>
    );
  };

  return (
    <>
      <FlexWrapper>
        <DescriptionSvg />
        <Title>Description</Title>
        <Edit onClick={enableEdit}>Edit</Edit>
        <Delete onClick={() => dispatch(deleteDescription({ cardId }))}>Delete</Delete>
      </FlexWrapper>
      {isEditable ? (
        <DescriptionForm onSubmit={handleSubmit(onSubmit)}>
          <InputField control={control} name="description" onFocus={onFocusCursorToEnd} autoFocus />
          <ButtonsWrapper>
            <SaveButton>Save</SaveButton>
            <CancelButton onClick={disableEdit}>Cancel</CancelButton>
          </ButtonsWrapper>
        </DescriptionForm>
      ) : (
        <StaticDescription />
      )}
    </>
  );
};

export default Description;

type DescriptionProps = {
  cardId: string;
  description: string;
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Edit = styled.div`
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
const Delete = styled(Edit)``;
const DescriptionText = styled.div`
  font-size: 14px;
  padding: 7px 15px;
  margin: 10px 0 20px 30px;
`;
const DescriptionButton = styled.div`
  height: 80px;
  margin: 10px 0 20px 30px;
  border-radius: 5px;
  width: 450px;
  cursor: pointer;
  font-size: 14px;
  padding: 7px 15px;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const DescriptionForm = styled.form`
  margin: 10px 0 20px 30px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

export const SaveButton = styled.button`
  height: 30px;
  background-color: #7dadb0;
  padding: 5px 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  &:hover {
    background-color: #10a6b1;
  }
`;
export const CancelButton = styled(SaveButton)`
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
`;
