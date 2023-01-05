import React, { createContext, useContext, useState, useEffect } from 'react';

import Router from 'next/router';

import { OwnerStore } from '~/interfaces';
import { User } from '~/interfaces/user';
import { useOwnerStore } from '~/hooksApi/useOwner';

import { LayoutProps } from './layout.props';

interface ProviderProps {
  children: any;
}

function useProviderLayout() {
  const [external, setExternal] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState<User>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(1);
  const [ownerStore, setOwnerStore] = useState<OwnerStore>({});

  const { getOwnerById } = useOwnerStore();

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const userParse = JSON.parse(localUser);
      setUser(userParse);
      getOwnerStore(userParse as User);
    }
  }, []);

  const getOwnerStore = async (user: User) => {
    const data = await getOwnerById(user?.id as string);
    handleSetOwnerStore(data as OwnerStore);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('store_access_token');
    setUser({});
    Router.push('/');
  };

  const handleSetOwnerStore = (owner: OwnerStore) => {
    setOwnerStore(owner);
  };

  const cartStorage = (data: any) => {
    localStorage.setItem(`${user?.name}cart`, JSON.stringify(data));
  };

  const setUserStorage = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const cartReset = () => {
    cartStorage([]);
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return {
    cartItems,
    external,
    setExternal,
    cartReset,
    logout,
    setCartItems,
    setUserStorage,
    setCartOpen,
    user,
    cartOpen,
    menuIndex,
    setMenuIndex,
    handleSetOwnerStore,
    ownerStore,
  };
}

const layoutContext = createContext<Partial<LayoutProps>>({});

export const useLayout = () => {
  return useContext(layoutContext);
};

export const ProviderLayout = ({ children }: ProviderProps) => {
  const layout: LayoutProps = useProviderLayout();
  return (
    <layoutContext.Provider value={layout}>{children}</layoutContext.Provider>
  );
};
