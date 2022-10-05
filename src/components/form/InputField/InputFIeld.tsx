import React, { InputHTMLAttributes } from 'react';
import type { FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Input } from 'components/UI';

const InputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  id,
  control,
  name,
  inputProps,
}: InputProps<TFieldValues, TName>) => {
  const { field } = useController({ control, name });
  return <Input {...field} {...inputProps} />;
};

export default InputField;

type InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  id?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
} & UseControllerProps<TFieldValues, TName>;
