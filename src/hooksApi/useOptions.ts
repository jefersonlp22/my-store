import { getDocs, collection } from 'firebase/firestore';

import { db } from '~/firebase/config';

interface OptionsProps {
  id: string;
  name?: string;
}

export function useOptions() {
  const useCollectionRef = collection(db, 'options');

  const getOptions = async (): Promise<OptionsProps[] | null> => {
    const { docs } = await getDocs(useCollectionRef);
    if (docs.length) {
      const options = docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      return options;
    }
    return null;
  };

  return {
    getOptions,
  };
}
