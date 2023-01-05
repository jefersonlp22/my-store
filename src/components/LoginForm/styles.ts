import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 75vh;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 0.4rem;
  padding: 48px;
  .MuiTextField-root {
    margin-top: 20px;
  }
`;
