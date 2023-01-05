import React, { useState } from 'react';

import { storage } from '~/firebase/config';

export interface FilesInput extends React.DragEvent<HTMLDivElement> {
  name: string;
}
export function useUploadImage() {
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const uploadImgFile = async (file: FilesInput) => {
    const uploadTask = storage.ref(`images/${file?.name}`).put(file as any);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error: any) => {
        console.log(error);
        setProgress(0);
      },
      () => {
        storage
          .ref('images')
          .child(file?.name)
          .getDownloadURL()
          .then((data) => setUrl(data));
      }
    );
  };
  return { url, progress, uploadImgFile };
}
