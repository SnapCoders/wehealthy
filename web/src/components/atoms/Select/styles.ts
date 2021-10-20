import styled, { css } from 'styled-components';

import { borders } from '@components/bosons/borders';
import { colors } from '@components/bosons/colors';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  // isErrored: boolean;
  // isDisabled?: boolean;
}

const containerVariations = {
  focused: css`
    outline-color: ${colors.blue[500]};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    input {
      height: 80%;
    }
  `,
  filled: css`
    outline-color: ${colors.primary[500]};

    input {
      height: 80%;
    }
  `,
};

export const Container = styled.div<IContainerProps>`
  ${({ isFocused, isFilled }) => css`
    min-width: 220px;
    max-width: 220px;
    height: 40px;

    outline: 2px solid ${colors.gray[500]};
    border-radius: ${borders.radii[300]};
    background: transparent;

    color: ${colors.white};
    font-family: Roboto, Poppins, Archivo, sans-serif;

    position: relative;

    transition: all 400ms;

    display: flex;
    align-items: flex-end;

    input {
      height: 100%;

      border: 1px solid transparent;
      background: transparent;
      outline: 0;

      color: ${colors.white};
      font-size: 14px;

      padding: 0 8px;

      flex: 1;

      transition: all 400ms;
    }

    select {
      display: none;
    }

    ${isFocused && containerVariations.focused}
    ${isFilled && containerVariations.filled}
  `}
`;

type ILabelContainerProps = IContainerProps;

const labelContainerVariations = {
  focused: css`
    background: ${colors.blue[500]};

    color: ${colors.white};

    top: -10px;
    left: 8px;

    opacity: 1;
    visibility: visible;
  `,
  filled: css`
    background: ${colors.primary[500]};

    color: ${colors.white};

    top: -10px;
    left: 8px;

    opacity: 1;
    visibility: visible;
  `,
};

export const LabelContainer = styled.div<ILabelContainerProps>`
  ${({ isFocused, isFilled }) => css`
    background: ${colors.white};

    color: ${colors.gray[500]};
    font-size: 12px;
    font-weight: normal;

    padding: 2px 8px;

    position: absolute;
    top: 0;
    left: 8px;

    opacity: 0;
    visibility: hidden;

    transition: all 400ms;

    ${isFocused && labelContainerVariations.focused}
    ${isFilled && labelContainerVariations.filled}
  `}
`;

export const SelectedOptions = styled.div`
  width: 100%;
  height: 80%;

  padding: 2px 0 2px 8px;

  flex: 1;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  &::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px transparent;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00bfff;
    border-radius: 7px;
  }

  span {
    border-radius: ${borders.radii[100]};
    background: ${colors.primary[500]};

    font-size: 14px;
    white-space: nowrap;

    padding: 2px 4px 2px 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: 0;
      background: none;
      outline: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: all 200ms;

      &:hover {
        transform: scale(1.2);

        svg {
          stroke: ${colors.black};
        }
      }

      svg {
        stroke: ${colors.black};

        margin-left: 4px;
      }
    }
  }
`;

export const MoreOfDisplay = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MoreOfDisplayTooltip = styled.div`
  border-radius: ${borders.radii[100]};
  background: ${colors.primary[500]};

  color: ${colors.white};
  font-size: 10px;

  padding: 0 6px;
  margin-right: 4px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 400ms;

  &:hover {
    background: ${colors.primary[600]};

    &:after {
      border-color: ${colors.primary[600]} transparent;
    }

    > div {
      opacity: 1;
      visibility: visible;
    }
  }

  &:after {
    content: '';

    border-style: solid;
    border-color: ${colors.primary[500]} transparent;
    border-width: 6px 6px 0 6px;

    position: absolute;
    top: 90%;
    left: 50%;

    transition: all 400ms;
    transform: translateX(-50%);
  }
`;

export const MoreOfDisplaySelectedOptionsContainer = styled.div`
  width: fit-content;

  outline: 2px solid ${colors.primary[500]};
  border-radius: ${borders.radii[300]};
  background: ${colors.white};

  position: absolute;
  top: 30px;
  right: -38px;

  padding: 8px;

  opacity: 0;
  visibility: hidden;

  transition: all 400ms;

  display: flex;
  flex-direction: column;
  gap: 8px;

  &:after {
    content: '';

    border-style: solid;
    border-color: ${colors.primary[500]} transparent;
    border-width: 0 6px 6px 6px;

    position: absolute;
    bottom: 100%;
    right: 39px;

    transition: all 400ms;
    transform: translateX(-50%);
  }

  span {
    width: fit-content;

    &:hover {
      transition: all 200ms;
      filter: brightness(1.2);
    }
  }
`;

type IOptionsContainerProps = IContainerProps;

const optionsContainerVariations = {
  focused: css`
    outline-color: ${colors.blue[500]};
    box-shadow: 0 6px 8px rgba(27, 32, 160, 0.4);

    top: 40px;

    opacity: 1;
    visibility: visible;
  `,
  filled: css`
    outline-color: ${colors.primary[500]};

    top: 40px;

    opacity: 1;
    visibility: visible;
  `,
  hide: css`
    top: 36px;

    opacity: 0;
    visibility: hidden;
  `,
};

export const OptionsContainer = styled.div<IOptionsContainerProps>`
  ${({ isFocused, isFilled }) => css`
    width: 100%;

    outline: 2px solid ${colors.primary[500]};
    border-bottom-left-radius: ${borders.radii[300]};
    border-bottom-right-radius: ${borders.radii[300]};
    background: ${colors.white};

    color: ${colors.black};

    position: absolute;
    top: 36px;

    opacity: 0;
    visibility: hidden;

    transition: all 400ms;

    ${isFocused && optionsContainerVariations.focused}
    ${isFilled && optionsContainerVariations.filled}
    ${!isFocused && optionsContainerVariations.hide}
  `}
`;

interface IOptionProps extends IContainerProps {
  isSelected?: boolean;
}

const optionVariations = {
  selected: css`
    background: ${colors.primary[500]};

    color: ${colors.white};
  `,
};

export const Option = styled.span<IOptionProps>`
  ${({ isFocused, isFilled, isSelected = false }) => css`
    font-size: 16px;

    padding: 8px;

    display: block;

    &:last-of-type {
      border-bottom-left-radius: ${borders.radii[300]};
      border-bottom-right-radius: ${borders.radii[300]};
    }

    &:hover {
      ${isFocused &&
      css`
        background: ${colors.blue[500]};
      `}

      ${isFilled &&
      css`
        background: ${colors.primary[500]};
      `}

      color: ${colors.white};

      cursor: pointer;
    }

    ${isSelected && optionVariations.selected}
  `}
`;

type IEmptyOptionsContainerProps = IContainerProps;

const emptyOptionsContainerVariations = {
  focused: css`
    outline-color: ${colors.blue[500]};
    box-shadow: 0 6px 8px rgba(27, 32, 160, 0.4);

    top: 40px;

    opacity: 1;
    visibility: visible;
  `,
  filled: css`
    outline-color: ${colors.primary[500]};

    top: 40px;

    opacity: 1;
    visibility: visible;
  `,
  hide: css`
    top: 36px;

    opacity: 0;
    visibility: hidden;
  `,
};

export const EmptyOptionsContainer = styled.div<IEmptyOptionsContainerProps>`
  ${({ isFocused, isFilled }) => css`
    width: 100%;

    outline: 2px solid ${colors.primary[500]};
    border-bottom-left-radius: ${borders.radii[300]};
    border-bottom-right-radius: ${borders.radii[300]};
    background: ${colors.white};

    color: ${colors.black};

    position: absolute;
    top: 0px !important;

    opacity: 0;
    visibility: hidden;

    transition: all 400ms;

    display: flex;
    align-items: center;
    justify-content: center;

    ${isFocused && emptyOptionsContainerVariations.focused}
    ${isFilled && emptyOptionsContainerVariations.filled}
    ${!isFocused && emptyOptionsContainerVariations.hide}

    span {
      font-size: 14px;

      padding: 12px;
    }
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
  width: 36px;
  height: 100%;

  transition: color 400ms;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ disabled }) => !disabled && iconContainerVariations.disabled}
`;
