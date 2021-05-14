import styled from 'styled-components';

export const TextWrap = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
  max-width: 300px;
`;
