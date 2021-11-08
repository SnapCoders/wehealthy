import React from 'react';

import { Card } from '@components/molecules';

import { Container, Content } from './styles';

const Search: React.FC = () => {
  return (
    <Container>
      {/* Header da pagina ficará aqui */}
      <div />

      <Content>
        <Card
          name="Jhonatan"
          crn="0102030405"
          isUser
          avatar="https://avatars.githubusercontent.com/u/39928763?v=4"
        />

        <Card
          name="Bruno Futema"
          isUser
          avatar="https://avatars.githubusercontent.com/u/46576135?v=4"
        />

        <Card name="Jhonatan da Costa cost" />

        <Card
          name="Jhonatan da Costa cost"
          isUser={false}
          avatar="https://avatars.githubusercontent.com/u/39928763?v=4"
        />
      </Content>
    </Container>
  );
};

export { Search };
