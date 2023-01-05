import axios from 'axios';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { Store } from '~/interfaces';
import { BASE_URL } from '~/utils/service';

export function useStore() {
  const useCollectionRef = collection(db, 'store');

  const createStore = async (store: Store) => {
    const { data } = await axios.post(`${BASE_URL}stores`, { ...store });
    return data;
  };

  const getStore = async () => {
    const { docs } = await getDocs(useCollectionRef);
    if (docs.length) {
      const stores = docs.map((data) => ({ ...data.data(), id: data.id }));
      return stores;
    }
    return null;
  };

  const updateStore = async (store: Store) => {
    const { data } = await axios.put(`${BASE_URL}stores/${store.id}`, {
      ...store,
    });
    return data;
  };

  const getStoreById = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}stores/${id}`);
    console.log('datinhaaaID', data);
    return data;
    /*const data = await getDoc(doc(db, 'owner-store', id));
    const { docs } = await getDocs(useCollectionRef);
    if (docs.length) {
      const owner = docs
        .map((data) => ({ ...data.data(), id: data.id }))
        .filter((item: Store) => item?.owner_id === id);
      return owner[0];
    }
    return null;
    */
  };

  return {
    createStore,
    updateStore,
    getStore,
    getStoreById,
  };
}
