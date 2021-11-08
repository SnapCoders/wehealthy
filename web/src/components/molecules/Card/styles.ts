import styled, { css } from 'styled-components';

interface IContainterProps {
  isUser?: boolean;
}

export const Container = styled.div<IContainterProps>`
  ${({ theme, isUser }) => css`
    background: ${isUser
      ? theme.colors.secondary[500]
      : theme.colors.primary[500]};
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    font-size: ${theme.typography.fontSize.normal};

    padding: 8px;
    width: 250px;
    height: 250px;
  `}
`;

export const Avatar = styled.div`
  ${({ theme }) => css`
    img {
      height: 140px;
      width: 140px;

      object-fit: contain;

      border-radius: 50%;
      margin-bottom: 9px;

      box-shadow: inset 0px -1px 1em transparent,
        1px 2px 0.4em ${theme.colors.black};
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    border-radius: 8px;

    width: 100%;
    height: 100%;

    padding: 4px;

    display: flex;
    flex-direction: column;

    align-items: center;
    align-content: center;
    justify-content: center;

    font-weight: ${theme.typography.fontWeight.normal};

    span {
      font-size: ${theme.typography.fontSize.extraSmall};

      max-width: 210px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:first-of-type {
      font-size: ${theme.typography.fontSize.normal};
    }
  `}
`;
