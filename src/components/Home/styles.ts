import styled from 'styled-components';

export const Container = styled.div`
  grid-template-columns: 2fr 1fr;
  align-items: center;
`;

export const CardStore = styled.div`
  padding: 10px;
  height: 60px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  box-shadow: 2px 6px 14px ${(props) => props.theme.colors.tundora};
  display: flex;
  cursor: pointer;
  align-items: center;
  .title {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
    margin-left: 5px;
  }
`;
