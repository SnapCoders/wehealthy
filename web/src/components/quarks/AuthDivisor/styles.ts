import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;

  z-index: 10;
`;

export const FirstParallelogram = styled.div`
  width: 80px;
  /* height: 196px; */
  height: 20.7vh;

  background: #ff7101;
  box-shadow: 0 0 8px 4px rgba(255, 113, 1, 0.8);

  position: absolute;

  transform: skew(45deg);

  z-index: 1;
`;

export const SecondParallelogram = styled.div`
  width: 80px;
  /* height: 238px; */
  height: 25.2vh;

  background: #ff7101;
  box-shadow: 0 0 8px 4px rgba(255, 113, 1, 0.8);

  position: absolute;
  /* top: 196px; */
  top: 20.7vh;
  /* left: 98px; */
  left: 98px;

  z-index: 2;

  @media (max-height: 860px) {
    left: 76px;
  }
`;

export const ThirdParallelogram = styled.div`
  width: 80px;
  /* height: 196px; */
  height: 20.7vh;

  background: #ff7101;
  box-shadow: 0 0 8px 4px rgba(255, 113, 1, 0.8);

  position: absolute;
  /* top: 434px; */
  top: 45.9vh;
  left: 196px;

  transform: skew(45deg);

  z-index: 3;

  @media (max-height: 860px) {
    left: 152px;
  }
`;

export const FourthParallelogram = styled.div`
  width: 80px;
  /* height: 158px; */
  height: 16.7vh;

  background: #ff7101;
  box-shadow: 0 0 8px 4px rgba(255, 113, 1, 0.8);

  position: absolute;
  /* top: 630px; */
  top: 66.6vh;
  left: 294px;

  z-index: 4;

  @media (max-height: 860px) {
    left: 228px;
  }
`;

export const FifthParallelogram = styled.div`
  width: 80px;
  /* height: 159px; */
  height: 16.7vh;

  background: #ff7101;
  box-shadow: 0 0 8px 4px rgba(255, 113, 1, 0.8);

  position: absolute;
  /* top: 788px; */
  top: 83.3vh;
  left: 374px;

  transform: skew(45deg);

  z-index: 5;

  @media (max-height: 860px) {
    left: 290px;
  }
`;
