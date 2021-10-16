import styled, { css } from 'styled-components';

import { borders } from '@components/bosons/borders';
import { colors } from '@components/bosons/colors';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  disabled?: boolean;
}

const containerVariations = {
  focused: css`
    border-color: ${colors.blue[500]};
    box-shadow: 0 6px 8px rgba(27, 32, 160, 0.4);

    input {
      height: 82%;
    }
  `,
  filled: css`
    border-color: ${colors.primary[500]};

    input {
      height: 82%;
    }
  `,
  errored: css`
    border-color: ${colors.red[500]};

    transition: none;
  `,
  disabled: css`
    border-color: ${colors.gray[500]};
    background: transparent;

    color: ${colors.text};

    input {
      height: 82%;

      color: ${colors.text};

      user-select: none;

      &::placeholder {
        color: ${colors.text};
      }
    }
  `,
};

export const Container = styled.div<IContainerProps>`
  ${({ isFocused, isFilled, isErrored, disabled }) => css`
    width: 220px;
    min-width: 220px;
    height: 40px;

    border-radius: ${borders.radii[300]};
    border: 2px solid ${colors.gray[500]};
    background: ${colors.white[100]};

    color: ${colors.gray[500]};
    font-family: Roboto, Poppins, Archivo, sans-serif;

    padding: 0 8px;

    position: relative;

    transition: all 400ms;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    input {
      height: 100%;

      border: 0;
      background: transparent;
      outline: 0;

      color: ${colors.gray[500]};
      font-size: 14px;

      flex: 1;
    }

    ${isFocused && containerVariations.focused}
    ${isFilled && containerVariations.filled}
    ${disabled && containerVariations.disabled}
    ${isErrored && containerVariations.errored}
  `}
`;

interface ILabelContainer {
  isFocused: boolean;
  isFilled: boolean;
  disabled?: boolean;
}

const labelContainerVariations = {
  show: css`
    top: -10px;
    left: 8px;

    opacity: 1;
    visibility: visible;
  `,
  hide: css`
    top: 0;
    left: 8px;

    opacity: 0;
    visibility: hidden;
  `,
  focused: css`
    background: ${colors.blue[500]};

    color: ${colors.text};
  `,
  filled: css`
    border: ${colors.secondary[500]};
    background: ${colors.primary[500]};

    color: ${colors.text};
  `,
  disabled: css`
    border: ${colors.gray[500]};
    background: ${colors.gray[500]};

    color: ${colors.text};
  `,
};

export const LabelContainer = styled.div<ILabelContainer>`
  ${({ isFocused, isFilled, disabled }) => css`
    background: ${colors.background};

    color: ${colors.text};
    font-size: 12px;
    font-weight: normal;

    padding: 2px 8px;

    position: absolute;

    transition: all 400ms;

    display: flex;
    align-items: center;
    justify-content: center;

    ${isFocused ? labelContainerVariations.show : labelContainerVariations.hide}
    ${isFocused && labelContainerVariations.focused}
    ${isFilled && labelContainerVariations.filled}
    ${disabled && labelContainerVariations.disabled}
    ${disabled && labelContainerVariations.show}
    ${isFilled && labelContainerVariations.show}
  `}
`;

interface IIconContainerProps {
  disabled?: boolean;
}

const iconContainerVariations = {
  disabled: css`
    cursor: pointer;

    &:hover {
      color: ${colors.gray[400]};
    }
  `,
};

export const IconContainer = styled.div<IIconContainerProps>`
  width: 20px;
  height: 100%;

  transition: color 400ms;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ disabled }) => !disabled && iconContainerVariations.disabled}
`;

export const ErrorMessage = styled.span`
  color: ${colors.red[400]};
  font-size: 14px;
  font-weight: normal;

  position: absolute;
  bottom: -24px;
  left: 0;
`;
