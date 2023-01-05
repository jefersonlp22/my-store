import styled from 'styled-components';

export interface ImageProps {
  url?: string;
}

export const Content = styled.div`
  min-height: 95%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  padding: 24px;
  .title {
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;

export const BoxImage = styled.div<ImageProps>`
  background-image: url('http://via.placeholder.com/160x160?text=Adcionar-imagem');
  ${(props) =>
    props.url &&
    `
    background-image: url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 160px;
  width: 160px;
  border-radius: 8px;
  margin-right: 24px;
  cursor: pointer;
`;
