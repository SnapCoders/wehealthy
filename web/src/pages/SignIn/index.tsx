import React from 'react';

import { AuthDivisor } from '@components/quarks';

import {
  Container,
  GuestForm,
  Presentation,
  PresentationBackground,
  PresentationContent,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Presentation>
        <PresentationBackground />

        <PresentationContent>
          <h1>SignIn</h1>

          <strong>
            O esporte e sua dieta são os investimentos mais importantes para a
            sua saúde.
          </strong>

          <p>
            A saúde é algo de que precisamos cuidar. O exercício é uma forma de
            manter um corpo saudável. O exercício torna a sua vida feliz.
          </p>
        </PresentationContent>
      </Presentation>

      <GuestForm>
        <AuthDivisor
          style={{ position: 'absolute', left: 0, marginLeft: '-58%' }}
        />

        <h1>Login</h1>
      </GuestForm>
    </Container>
  );
};

export { SignIn };
