import styled, { css } from 'styled-components';

import { colors } from '../../bosons/colors';

interface IContainerProps {
  isSelected: boolean;
}

const containerCss = {
  select: css`
    background: ${colors.blue[500]};
  `,
  selected: css`
    max-width: 150px;

    background: ${colors.primary[500]};

    span {
      text-overflow: ellipsis;
      white-space: nowrap;

      overflow: hidden;
    }
  `,
};

export const Container = styled.div<IContainerProps>`
  width: fit-content;
  height: fit-content;

  border-radius: 4px;

  font-family: Roboto, Poppins, Archivo, sans-serif;

  padding: 2px 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ isSelected }) =>
    isSelected ? containerCss.selected : containerCss.select}

  &:hover {
    background: ${colors.gray[500]};
  }

  span {
    color: ${colors.text};
    font-size: 12px;
    line-height: 18px;

    margin-right: 6px;
    padding: 2px 0;

    user-select: none;
  }

  button {
    border: 0;
    background: transparent;

    transition: all 200ms;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      filter: brightness(1.4);
      transform: scale(1.2);
    }

    svg {
      cursor: pointer;
    }
  }
`;
