import React from 'react';

import { Avatar as AvatarIcon } from '@material-ui/core';

import * as S from './styles';

interface AvatarProps {
  url?: string;
}

export const Avatar = ({ url }: AvatarProps) => {
  return (
    <S.ContainerAvatar>
      <AvatarIcon src={url} alt="Avatar" />
    </S.ContainerAvatar>
  );
};
