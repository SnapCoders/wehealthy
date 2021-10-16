import React from 'react';

import { Input } from '@components/atoms';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Input label="Label" name="Input" type="password" />
    </Container>
  );
};

export { SignIn };
