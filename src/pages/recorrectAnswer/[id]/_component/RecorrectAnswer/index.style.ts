import styled, { css } from 'styled-components';

export const RecorrectAnswerWrap = styled.div`
  display: flex;
`;

export const RecorrectAnswerItem = styled.span<{
  bgColor: string;
  color: string;
  isActive: boolean;
}>`
  width: 32px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};

  &:first-child {
    ${({ isActive }) =>
      !isActive
        ? css`
            border-top: 1px solid #dadbe1;
            border-left: 1px solid #dadbe1;
            border-bottom: 1px solid #dadbe1;
          `
        : null}

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    ${({ isActive }) =>
      !isActive
        ? css`
            border-top: 1px solid #dadbe1;
            border-right: 1px solid #dadbe1;
            border-bottom: 1px solid #dadbe1;
          `
        : null}
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
