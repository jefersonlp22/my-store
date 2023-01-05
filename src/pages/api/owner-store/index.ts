import { getDocs, collection, addDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/firebase/config';
import { OwnerStore } from '~/interfaces';

const ownerStore = async (_req: NextApiRequest, res: NextApiResponse) => {
  const useCollectionRef = collection(db, 'owner-store');

  try {
    if (_req.method === 'GET') {
      let OwnersStore: OwnerStore[] = [];
      const { docs } = await getDocs(useCollectionRef);
      if (docs.length) {
        OwnersStore = docs.map((data) => ({ ...data.data(), id: data.id }));
      }
      res.status(200).json(OwnersStore);
    } else if (_req.method === 'POST') {
      const params: OwnerStore = _req.body;
      const { id } = await addDoc(useCollectionRef, params);
      res.status(200).json({ id });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default ownerStore;
