import { Tab } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: space-around;
  position: relative;
`;

export const ContainerUser = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.div`
  font-size: 16px;
  line-height: 21.09px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: default;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .contact {
    color: #aeaeae;
    font-size: 14px;
    line-height: 16.41px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

export const TabMenu = styled(Tab)`
  :focus {
    color: ${(props) => props.theme.colors.primary};
    .MuiTabs-indicator {
      background: red !important;
    }
  }
`;
