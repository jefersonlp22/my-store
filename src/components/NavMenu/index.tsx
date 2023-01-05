import React from 'react';

import { Tabs } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
//import { ShoppingCart, MagnifyingGlass } from 'phosphor-react';

import SuaMarca from '~/assets/img/logo1.png';
import { useLayout } from '~/contexts/layoutContexts';
import { OwnerStore, Store } from '~/interfaces';

import { Avatar } from '../Avatar';
import * as S from './styles';

interface NavMenuProps {
  ownerStore?: OwnerStore;
  store?: Store;
  type?: 'shop' | 'dashboard' | 'default';
  handleClick?: () => void;
}

export function NavMenu(props: NavMenuProps) {
  const { ownerStore, store, handleClick, type = 'default' } = props;
  const { user, setMenuIndex, menuIndex } = useLayout();

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: any, newValue: number) => {
    if (setMenuIndex) {
      setMenuIndex(newValue);
    }
    console.log(event);
  };

  return (
    <S.Container>
      {type === 'default' && (
        <Link href="/">
          <a>
            {store?.picture_url ? (
              <img src={store?.picture_url} alt="Sua marca" width={50}></img>
            ) : (
              <Image
                width={'100%'}
                height={40}
                src={SuaMarca}
                alt="Sua lojinha"
              />
            )}
          </a>
        </Link>
      )}
      {type === 'dashboard' && (
        <>
          <Tabs value={menuIndex} onChange={handleChange}>
            <S.TabMenu
              className="focus:outline-none focus:font-semibold"
              label="Produtos"
              {...a11yProps(0)}
            />
            <S.TabMenu
              className="focus:outline-none focus:font-semibold"
              label="Cadastro"
              {...a11yProps(1)}
            />
            <S.TabMenu
              className="focus:outline-none focus:font-semibold"
              label="Lojinha"
              {...a11yProps(2)}
            />
          </Tabs>
        </>
      )}
      {user?.id && (
        <>
          <S.ContainerUser>
            <div onClick={handleClick} className="cursor-pointer">
              <Avatar url={ownerStore?.picture_url as string} />{' '}
            </div>
            <div className="md:flex hidden">
              <Link href="/dashboard">
                <S.Title>
                  <a>{`Olá ${ownerStore?.name ?? ''}`}</a>
                  {ownerStore && (
                    <div className="contact">Entrar em contato</div>
                  )}
                </S.Title>
              </Link>{' '}
            </div>
          </S.ContainerUser>
        </>
      )}
    </S.Container>
  );
}
