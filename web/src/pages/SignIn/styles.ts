import styled, { css } from 'styled-components';

import loginPresentation from '@assets/images/login-presentation.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Presentation = styled.div`
  width: 70%;
  height: 100vh;

  position: relative;
`;

export const PresentationBackground = styled.div`
  width: 100%;
  height: 100%;

  background: url(${loginPresentation});
  background-size: cover;

  position: absolute;
  top: 0;

  z-index: 1;

  &:after {
    content: '';

    width: 100%;
    height: 100%;

    background: linear-gradient(
      180deg,
      rgba(51, 51, 51, 0.6) 0%,
      rgba(51, 51, 51, 0.3) 100%
    );

    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const PresentationContent = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;

    padding: 120px;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    z-index: 2;

    strong {
      max-width: 480px;

      font-size: ${theme.typography.fontSize.large};
      line-height: ${theme.typography.lineHeight.large};
    }
  `}
`;

export const GuestForm = styled.div`
  height: 100vh;

  background: #232323;

  box-shadow: 0 0 200px 450px #232323;

  position: relative;

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  z-index: 1;
`;
