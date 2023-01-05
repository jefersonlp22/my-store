import React, { useState, useEffect } from 'react';

import { Button, TextField } from '@material-ui/core';
import Image from 'next/image';

import ImageDefault from '~/assets/img/imgDefault.png';
import { storage } from '~/firebase/config';
import { useStore } from '~/hooksApi/useStore';
import { Store, OwnerStore } from '~/interfaces';

import * as S from './styles';

type Storetype = keyof Store;

export interface StoreFormProps {
  ownerStore: OwnerStore;
  storeData?: Store;
}

function StoreForm({ storeData }: StoreFormProps) {
  const [store, setStore] = useState<Store>(storeData as Store);
  const [selectedImgStore, setSelectedImgStore] = useState<any>();
  const [selectedBannerStore, setSelectedBannerStore] = useState<any>();
  const { createStore, updateStore } = useStore();

  const imageStoreRef = React.createRef<any>();
  const bannerStoreRef = React.createRef<any>();

  const onFileStoreChange = (event: any) => {
    setSelectedImgStore(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedImgStore) {
      const uploadTask = storage
        .ref(`images/${selectedImgStore?.name}`)
        .put(selectedImgStore);
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
            .child(selectedImgStore?.name)
            .getDownloadURL()
            .then((url) => {
              handleStore('picture_url', url);
            });
        }
      );
    }
  }, [selectedImgStore]);

  const onFileBannerStore = (event: any) => {
    setSelectedBannerStore(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedBannerStore) {
      const uploadTask = storage
        .ref(`images/${selectedBannerStore?.name}`)
        .put(selectedBannerStore);
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
            .child(selectedBannerStore?.name)
            .getDownloadURL()
            .then((url) => {
              handleStore('banner_url', url);
            });
        }
      );
    }
  }, [selectedBannerStore]);

  const handleStore = (key: Storetype, value: any) => {
    setStore({
      ...store,
      [key]: value,
    });
  };

  const handleCreateStore = () => {
    createStore(store);
  };

  const handleUpdateStore = () => {
    updateStore(store);
  };

  return (
    <>
      <S.ContentStore className="md:w-2/4 w-full">
        <div className="title">
          {store?.id ? 'Dados da lojina' : 'Cadrastrar Lojinha'}
        </div>
        <S.BoxImageStore>
          <div className="flex">
            <input
              style={{ display: 'none' }}
              ref={imageStoreRef as any}
              type="file"
              onChange={(e) => onFileStoreChange(e)}
            />
            <S.StoreImange>
              {store?.picture_url ? (
                <img src={store?.picture_url} alt="" />
              ) : (
                <Image
                  width={'100%'}
                  height={60}
                  src={ImageDefault}
                  alt="Sua lojinha"
                />
              )}
            </S.StoreImange>
            <div
              onClick={() => imageStoreRef?.current.click()}
              className="photoProfile cursor-pointer"
            >
              Escolher/Editar
              <br />
              logo da sua loja
            </div>
          </div>
        </S.BoxImageStore>
        <S.BannerStore
          url={store?.banner_url}
          onClick={() => bannerStoreRef?.current.click()}
          className="banner mt-3 cursor-pointer w-full"
        >
          <input
            style={{ display: 'none' }}
            ref={bannerStoreRef as any}
            type="file"
            onChange={(e) => onFileBannerStore(e)}
          />
        </S.BannerStore>
        <div className="flex">
          <div className="mr-4 mt-3">
            <TextField
              onChange={(e) => handleStore('name', e.target.value)}
              label="Nome da lojinha"
              variant="standard"
              value={store?.name}
              autoComplete="none"
              InputLabelProps={{ shrink: !!store?.name }}
            />
          </div>
          <div className="mr-4 mt-3">
            <TextField
              onChange={(e) => handleStore('phone', e.target.value as any)}
              label="WhatsApp (da lojinha)"
              variant="standard"
              type="tel"
              value={store?.phone}
              autoComplete="none"
              InputLabelProps={{ shrink: !!store?.phone }}
            />
          </div>
        </div>
        <div className="mt-3">
          <TextField
            onChange={(e) => handleStore('social_url', e.target.value)}
            label="Instagran"
            variant="standard"
            className="w-full"
            value={store?.social_url}
            autoComplete="none"
            InputLabelProps={{ shrink: !!store?.social_url }}
          />
        </div>
        <div
          onClick={store?.id ? handleUpdateStore : handleCreateStore}
          className="mt-10"
        >
          <Button color="primary" variant="outlined" size="large">
            Salvar
          </Button>
        </div>
      </S.ContentStore>
    </>
  );
}

export { StoreForm };
