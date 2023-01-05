import styled from 'styled-components';

interface ContainerProps {
  error?: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${(props) =>
    props.error
      ? `
      .MuiSelect-select.MuiSelect-select {
        border: 1px solid #FF6F6F;
      }
      `
      : ''}
`;

export const WrapperHelperText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 4px 14px 0 0px;

  .MuiSvgIcon-root {
    color: '#FF6F6F';
  }

  span {
    color: '#FF6F6F' !important;
    font-weight: 400 !important;
    font-size: 13px !important;
    margin: 0;
  }
`;
