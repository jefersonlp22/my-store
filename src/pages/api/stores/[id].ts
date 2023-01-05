import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/firebase/config';
import { Store } from '~/interfaces';

const store = async (_req: NextApiRequest, res: NextApiResponse) => {
  const useCollectionRef = collection(db, 'store');
  const { id } = _req.query;

  try {
    /*
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }
    */
    if (_req.method === 'GET') {
      let stores: any = [];
      const { docs } = await getDocs(useCollectionRef);
      if (docs.length) {
        stores = docs
          .map((data) => ({ ...data.data(), id: data.id }))
          .filter((item: Store) => item?.owner_id === id);
      }
      res.status(200).json(stores[0]);
    } else if (_req.method === 'PUT') {
      const params: Store = _req.body;
      const storeDoc = doc(db, 'store', id as string);
      const newData = {
        name: params.name,
        phone: params.phone,
        picture_url: params.picture_url,
        social_url: params.social_url,
        banner_url: params?.banner_url,
      };
      await updateDoc(storeDoc, newData);
      res.status(200).json({ newData });
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default store;
