import React, { useState, useEffect } from 'react';

import { Layout, RegisterForm, StoreForm, ProductForm } from '~/components';
import { useLayout } from '~/contexts/layoutContexts';
import { useStore } from '~/hooksApi/useStore';
import { Store, OwnerStore } from '~/interfaces';

type Storetype = keyof Store;
type OwnerStoreType = keyof OwnerStore;

function Dashboard() {
  const [ownerStoreData, setOwnerStoreData] = useState<OwnerStore>({});
  const [store, setStore] = useState<Store>({});

  const { getStoreById } = useStore();
  const { user, menuIndex, ownerStore } = useLayout();

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
    setOwnerStoreData({
      ...ownerStoreData,
      [key]: value,
    });
  };

  const getStore = async () => {
    const data = await getStoreById(ownerStore?.id as string);
    if (data) {
      setStore(data as Store);
    }
  };

  useEffect(() => {
    if (ownerStore?.id) {
      handleStore('owner_id', ownerStoreData.id);
      setOwnerStoreData(ownerStore);
      getStore();
    }
  }, [ownerStore]);

  const dashboardContent = [
    {
      component: <ProductForm />,
    },
    {
      component: ownerStoreData?.id && (
        <RegisterForm ownerData={ownerStoreData} />
      ),
    },
    {
      component: store.id && (
        <StoreForm ownerStore={ownerStoreData} storeData={store} />
      ),
    },
  ];

  return (
    <Layout type="dashboard">
      <div className="w-full h-full p-6 flex justify-center items-center">
        {dashboardContent[menuIndex as number].component}
      </div>
    </Layout>
  );
}

export default Dashboard;
