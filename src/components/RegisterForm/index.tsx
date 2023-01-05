import React, { useState, useEffect } from 'react';

import { Avatar, Button, TextField } from '@material-ui/core';

import { useLayout } from '~/contexts/layoutContexts';
import { storage } from '~/firebase/config';
import { useOwnerStore } from '~/hooksApi/useOwner';
import { OwnerStore } from '~/interfaces';

import * as S from './styles';

type OwnerStoreType = keyof OwnerStore;
export interface RegisterFormProps {
  ownerData?: OwnerStore;
  setSteps?: (value: string) => void;
}

function RegisterForm({ ownerData, setSteps }: RegisterFormProps) {
  const [ownerStore, setOwnerStore] = useState<OwnerStore>(
    ownerData as OwnerStore
  );

  const [selectedImgProfile, setSelectedImgProfile] = useState<any>();

  const { createOwnerStore, updateOwnerStore } = useOwnerStore();
  const { user } = useLayout();

  const imageProfileRef = React.createRef<any>();

  useEffect(() => {
    if (user?.id) {
      setOwnerStore({
        ...ownerStore,
        email: user?.email,
        user_id: user.id as string,
      });
    }
  }, [user?.id]);

  const onFileProfileChange = (event: any) => {
    setSelectedImgProfile(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedImgProfile) {
      const uploadTask = storage
        .ref(`images/${selectedImgProfile?.name}`)
        .put(selectedImgProfile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(selectedImgProfile?.name)
            .getDownloadURL()
            .then((url) => {
              handleOwnerStore('picture_url', url);
            });
        }
      );
    }
  }, [selectedImgProfile]);

  const handleOwnerStore = (key: OwnerStoreType, value: any) => {
    setOwnerStore({
      ...ownerStore,
      [key]: value,
    });
  };

  const handleCreateOwnerStore = async () => {
    await createOwnerStore(ownerStore);
    if (setSteps) {
      setSteps('store');
    }
  };

  const handleUpdateOwnerStore = () => {
    updateOwnerStore(ownerStore);
  };

  return (
    <>
      <S.Content className="md:w-2/4 w-full">
        <div className="title">
          {ownerStore.id ? 'Meu cadastro' : 'Cadrastrar seus dados'}
        </div>
        <S.BoxImageProfile>
          <div className="flex">
            <input
              style={{ display: 'none' }}
              ref={imageProfileRef as any}
              type="file"
              onChange={(e) => onFileProfileChange(e)}
            />

            <Avatar src={ownerStore?.picture_url} />
            <div
              className="photoProfile cursor-pointer"
              onClick={() => imageProfileRef?.current.click()}
            >
              Escolher/Editar <br /> foto do perfil
            </div>
          </div>
        </S.BoxImageProfile>
        <div className="w-full mt-3">
          <TextField
            onChange={(e) => handleOwnerStore('name', e.target.value)}
            label="Nome completo"
            variant="standard"
            className="w-full"
            value={ownerStore?.name}
            autoComplete="none"
            InputLabelProps={{ shrink: !!ownerStore?.name }}
          />
        </div>
        <div className="flex">
          <div className="mr-4 mt-3">
            <TextField
              onChange={(e) => handleOwnerStore('phone', e.target.value as any)}
              label="Telefone"
              variant="standard"
              type="tel"
              value={ownerStore?.phone}
              autoComplete="none"
              InputLabelProps={{ shrink: !!ownerStore?.phone }}
            />
          </div>
          <div className="mr-4 mt-3">
            <TextField
              type="email"
              disabled
              label="Email"
              variant="standard"
              value={ownerStore?.email}
              InputLabelProps={{ shrink: !!ownerStore?.email }}
            />
          </div>
        </div>
        <div className="mt-3 w-2/3">
          <TextField
            onChange={(e) => handleOwnerStore('social_url', e.target.value)}
            label="Instagran"
            variant="standard"
            value={ownerStore?.social_url}
            autoComplete="none"
            className="w-full"
            InputLabelProps={{ shrink: !!ownerStore?.social_url }}
          />
        </div>
        <div
          onClick={
            ownerStore.id ? handleUpdateOwnerStore : handleCreateOwnerStore
          }
          className="mt-10"
        >
          <Button color="primary" variant="outlined" size="large">
            Salvar
          </Button>
        </div>
      </S.Content>
    </>
  );
}

export { RegisterForm };
