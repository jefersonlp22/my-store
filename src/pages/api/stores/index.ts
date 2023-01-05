import { getDocs, collection, addDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/firebase/config';
import { Store } from '~/interfaces';

const store = async (_req: NextApiRequest, res: NextApiResponse) => {
  const useCollectionRef = collection(db, 'store');

  try {
    if (_req.method === 'GET') {
      let stores: any = [];
      const { docs } = await getDocs(useCollectionRef);
      if (docs.length) {
        stores = docs.map((data) => ({ ...data.data(), id: data.id }));
      }
      res.status(200).json(stores);
    } else if (_req.method === 'POST') {
      const params: Store = _req.body;
      const { id } = await addDoc(useCollectionRef, params);
      res.status(200).json({ id });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default store;
