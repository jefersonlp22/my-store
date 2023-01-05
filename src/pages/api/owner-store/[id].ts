import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/firebase/config';
import { OwnerStore } from '~/interfaces';

const ownerStore = async (_req: NextApiRequest, res: NextApiResponse) => {
  const useCollectionRef = collection(db, 'owner-store');
  const { id } = _req.query;

  try {
    if (_req.method === 'GET') {
      let ownersStore: any = [];
      const { docs } = await getDocs(useCollectionRef);
      if (docs.length) {
        ownersStore = docs
          .map((data) => ({ ...data.data(), id: data.id }))
          .filter((item: OwnerStore) => item?.user_id === id);
      }
      res.status(200).json(ownersStore[0]);
    } else if (_req.method === 'PUT') {
      const params: OwnerStore = _req.body;
      const storeDoc = doc(db, 'owner-store', id as string);
      const newData = {
        name: params.name,
        phone: params.phone,
        picture_url: params.picture_url,
        social_url: params.social_url,
      };
      await updateDoc(storeDoc, newData);
      res.status(200).json({ newData });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default ownerStore;
