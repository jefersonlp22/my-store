import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Layout, RegisterForm, StoreForm } from '~/components';
import { useLayout } from '~/contexts/layoutContexts';
import { useOwnerStore } from '~/hooksApi/useOwner';
import { useStore } from '~/hooksApi/useStore';
import { Store, OwnerStore } from '~/interfaces';

type Storetype = keyof Store;
type OwnerStoreType = keyof OwnerStore;
type StepProps = 'owner' | 'store';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

function Register() {
  const [ownerStore, setOwnerStore] = useState<OwnerStore>({});
  const [store, setStore] = useState<Store>({});
  const [steps, setSteps] = useState<StepProps>('owner');

  const { getOwnerById } = useOwnerStore();
  const { getStoreById } = useStore();
  const { user } = useLayout();

  useEffect(() => {
    if (user?.email) {
      handleOwnerStore('email', user?.email);
    }
  }, [user?.email]);

  const handleStore = (key: Storetype, value: any) => {
    setStore({
      ...store,
      [key]: value,
    });
  };

  const handleOwnerStore = (key: OwnerStoreType, value: any) => {
    setOwnerStore({
      ...ownerStore,
      [key]: value,
    });
  };

  const getOwnerStore = async () => {
    const data = await getOwnerById(user?.email as string);
    if (data) {
      setOwnerStore(data as OwnerStore);
      handleStore('owner_id', data.id);
    }
  };

  useEffect(() => {
    if (user?.email) {
      getOwnerStore();
    }
  }, [user]);

  const getStore = async () => {
    const data = await getStoreById(ownerStore?.id as string);
    if (data) {
      setStore(data as Store);
    }
  };

  useEffect(() => {
    if (ownerStore.id) {
      getStore();
    }
  }, [ownerStore]);

  const formStep = {
    owner: (
      <RegisterForm
        setSteps={(value) => setSteps(value as StepProps)}
        ownerData={ownerStore}
      />
    ),
    store: <StoreForm ownerStore={ownerStore} storeData={store} />,
  };

  return (
    <>
      <Layout>
        <Container>{formStep[steps]}</Container>
      </Layout>
    </>
  );
}

export default Register;
