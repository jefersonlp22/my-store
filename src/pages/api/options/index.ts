import { getDocs, collection } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '~/firebase/config';

const options = async (_req: NextApiRequest, res: NextApiResponse) => {
  const useCollectionRef = collection(db, 'options');

  try {
    if (_req.method === 'GET') {
      let options: any = [];
      const { docs } = await getDocs(useCollectionRef);
      if (docs.length) {
        options = docs.map((data) => ({ ...data.data(), id: data.id }));
      }
      res.status(200).json(options);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default options;
