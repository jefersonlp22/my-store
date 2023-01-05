import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  footer {
    border-top: 1px solid gray;
    padding: 24px;
  }
`;

export const Content = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
`;
