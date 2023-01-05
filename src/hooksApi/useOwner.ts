import axios from 'axios';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { OwnerStore } from '~/interfaces';
import { BASE_URL } from '~/utils/service';

export function useOwnerStore() {
  const useCollectionRef = collection(db, 'owner-store');

  const createOwnerStore = async (owner: OwnerStore) => {
    const { data } = await axios.post(`${BASE_URL}owner-store`, { ...owner });
    return data;
  };

  const getOwnersStore = async () => {
    const { docs } = await getDocs(useCollectionRef);
    if (docs.length) {
      const owners = docs.map((data) => ({ ...data.data(), id: data.id }));
      return owners;
    }
    return null;
  };

  const updateOwnerStore = async (owner: OwnerStore) => {
    const { data } = await axios.put(`${BASE_URL}owner-store/${owner.id}`, {
      ...owner,
    });
    return data;
  };

  const getOwnerById = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}owner-store/${id}`);
    console.log('datinhaaaOwnerID', data);
    return data;
  };

  return {
    createOwnerStore,
    updateOwnerStore,
    getOwnersStore,
    getOwnerById,
  };
}
