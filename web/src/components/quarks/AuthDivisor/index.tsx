import React from 'react';

import { CSSProperties } from 'styled-components';

import {
  Container,
  FifthParallelogram,
  FirstParallelogram,
  FourthParallelogram,
  SecondParallelogram,
  ThirdParallelogram,
} from './styles';

interface IAuthDivisorProps {
  style?: CSSProperties;
}

const AuthDivisor: React.FC<IAuthDivisorProps> = ({ style }) => {
  return (
    <Container style={style}>
      <FirstParallelogram />

      <SecondParallelogram />

      <ThirdParallelogram />

      <FourthParallelogram />

      <FifthParallelogram />
    </Container>
  );
};

export { AuthDivisor };
