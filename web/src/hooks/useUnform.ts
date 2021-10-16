import { UnformField, useField } from '@unform/core';

interface IResponse {
  fieldName: string;
  registerField: <T>(field: UnformField<T>) => void;
  defaultValue: any;
  clearError: () => void;
  error: string | undefined;
}

function useUnform(inputName: string): IResponse | undefined {
  try {
    const unformResponse = useField(inputName);

    return unformResponse;
  } catch {
    return undefined;
  }
}

export { useUnform };
