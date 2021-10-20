import React from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

import { colors } from '../../bosons/colors';

import { Container } from './styles';

export interface ITagProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tag: React.FC<ITagProps> = ({ label, isSelected = false, onClick }) => {
  return (
    <Container isSelected={isSelected}>
      <span>{label}</span>

      <button type="button" onClick={onClick}>
        {isSelected ? (
          <FiX size={14} color={colors.green[400]} />
        ) : (
          <FiPlus size={14} color={colors.white[100]} />
        )}
      </button>
    </Container>
  );
};

export { Tag };
