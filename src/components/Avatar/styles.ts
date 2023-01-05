import styled from 'styled-components';

export const ContainerAvatar = styled.div`
  height: 46px;
  width: 46px;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.colors.primary};
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;
