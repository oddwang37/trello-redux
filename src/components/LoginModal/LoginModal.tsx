import React, { FC } from 'react';
import styled from 'styled-components';
import { useForm, FieldValues } from 'react-hook-form';

import { Overlay, Button } from 'components';
import { useAppDispatch } from 'state/store';
import { setUsername } from 'state/ducks/username/slices';
import { InputField } from 'components';

interface FormValues extends FieldValues {
  username: string;
}

const LoginModal: FC<LoginModalProps> = ({ isOpened, closeModal }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { username: '' },
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    dispatch(setUsername({ name: data.username }));
    closeModal();
  };

  return (
    <Overlay isOpened={isOpened}>
      <Root onSubmit={handleSubmit(onSubmit)}>
        <Title>Enter your name</Title>
        <InputField control={control} name="username" rules={{ required: true }} />
        <Button>Submit</Button>
      </Root>
    </Overlay>
  );
};

export default LoginModal;

type LoginModalProps = {
  isOpened: boolean;
  closeModal: () => void;
};

const Root = styled.form`
  width: 30vw;
  height: 30vh;
  background-color: #fff;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
