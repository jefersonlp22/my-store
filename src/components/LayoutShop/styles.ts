import styled from 'styled-components';

export const Container = styled.nav`
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
  height: calc(100vh - 70px);
`;
