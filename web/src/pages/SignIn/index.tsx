import React, { useCallback } from 'react';

import { Input, Select } from '@components/atoms';

import { Container, Unform } from './styles';

type IFormData = any;

const SignIn: React.FC = () => {
  const handleSubmit = useCallback((formData: IFormData) => {
    console.log(formData);
  }, []);

  return (
    <Container>
      <Unform onSubmit={handleSubmit}>
        <Input label="Label" name="Input" />

        <Input label="Label" name="Input" type="password" />

        <Select
          label="Label"
          name="Select"
          options={[
            { label: 'Opção 1', value: 1 },
            { label: 'Opção 2', value: 2, selected: true },
            { label: 'Opção 3', value: 3 },
          ]}
        />
      </Unform>
    </Container>
  );
};

export { SignIn };
