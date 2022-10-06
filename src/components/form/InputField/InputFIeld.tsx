import React, { InputHTMLAttributes, KeyboardEvent } from 'react';
import type { FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Input } from 'components/UI';

const InputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  id,
  control,
  name,
  ...props
}: InputProps<TFieldValues, TName>) => {
  const {
    field: { onBlur, ...restField },
  } = useController({ control, name });
  const { onBlur: onBlurProps, onKeyDown: onKeyDownProps, ...restProps } = props;

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlurProps?.(e);
    onBlur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDownProps?.(e);
  };

  return <Input onBlur={onInputBlur} onKeyDown={onKeyDown} {...restField} {...restProps} />;
};

export default InputField;

type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  id?: string;
} & UseControllerProps<TFieldValues, TName> &
  InputHTMLAttributes<HTMLInputElement>;
