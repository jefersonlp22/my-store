import { OwnerStore } from '~/interfaces';
import { User } from '~/interfaces/user';

export interface LayoutProps {
  cartOpen?: boolean;
  external: string | null;
  storageKey?: string;
  setCartOpen: (value: boolean) => void;
  setExternal: (value: string) => void;
  cartReset?: () => void;
  logout: () => void;
  setCartItems?: (value: any) => void;
  children?: any;
  setUserStorage(value: User): void;
  user: User;
  menuIndex: number;
  setMenuIndex: (value: number) => void;
  ownerStore: OwnerStore;
  handleSetOwnerStore: (value: OwnerStore) => void;
}
