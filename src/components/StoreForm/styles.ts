import styled from 'styled-components';

export interface BannerProps {
  url?: string;
}

export const ContentStore = styled.div`
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

export const BoxImageProfile = styled.div`
  display: flex;
  justify-content: space-between;
  .photoProfile {
    color: ${(props) => props.theme.colors.primary};
    font-size: 14px;
    font-weight: 500;
    padding-left: 16px;
  }
`;

export const BoxImageStore = styled.div`
  display: flex;
  justify-content: space-between;
  .photoProfile {
    color: ${(props) => props.theme.colors.primary};
    font-size: 14px;
    font-weight: 500;
    padding-left: 16px;
  }
`;

export const StoreImange = styled.div`
  width: 70px;
  height: 40px;
  border-radius: 8px;
  img {
    height: 100%;
    width: 100%;
  }
`;

export const BannerStore = styled.div<BannerProps>`
  background-image: url('http://via.placeholder.com/540x90?text=Click para selecionar banner da lojinha');
  ${(props) =>
    props.url &&
    `
    background-image: url(${props.url})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 120px;
  border-radius: 8px;
`;
