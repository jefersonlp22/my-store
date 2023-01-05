import axios from 'axios';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { Product } from '~/interfaces';
import { BASE_URL } from '~/utils/service';

export function useProduct() {
  const useCollectionRef = collection(db, 'product');

  const createProduct = async (owner: Product) => {
    const { data } = await axios.post(`${BASE_URL}product`, { ...owner });
    return data;
  };

  const getProducts = async () => {
    const { docs } = await getDocs(useCollectionRef);
    if (docs.length) {
      const owners = docs.map((data) => ({ ...data.data(), id: data.id }));
      return owners;
    }
    return null;
  };

  const updateProduct = async (owner: Product) => {
    const { data } = await axios.put(`${BASE_URL}product/${owner.id}`, {
      ...owner,
    });
    return data;
  };

  const getProductById = async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}product/${id}`);
    console.log('datinhaaaOwnerID', data);
    return data;
  };

  return {
    createProduct,
    updateProduct,
    getProducts,
    getProductById,
  };
}
