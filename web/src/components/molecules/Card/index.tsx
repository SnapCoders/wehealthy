import React from 'react';

import defaultAvatar from '../../../assets/images/avatar-default.png';

import { Container, Avatar, Info } from './styles';

interface ICardProps {
  name: string;
  avatar?: string;
  isUser?: boolean;
  crn?: string;
}

const Card: React.FC<ICardProps> = ({ name, crn, avatar, isUser = true }) => {
  return (
    <Container isUser={isUser}>
      <Avatar>
        <img src={avatar || defaultAvatar} alt={`Foto de ${name}`} />
      </Avatar>

      <Info>
        <span>{name}</span>
        {isUser && !!crn && <span>CRN: {crn}</span>}
      </Info>
    </Container>
  );
};

export { Card };
