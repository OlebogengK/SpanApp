// I created a custom hook called usePhotos for fetching topics from the api via the controller
// the useState is for managing state of photos and set the photos
// the useEffect is used to fetch data when the component renders or the dependencies (page,perPage,orderBy) change

import { useState, useEffect } from 'react';
import PhotosController from '../controller/photo/photo.controller';

const usePhotos = (topic: string) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const controller = new PhotosController();
      try {
        const data = await controller.fetchPhotos(topic);
        setPhotos(data);
      } catch (err) {
        setError('Failed to fetch photos.');
        console.error(err);
      }
    };

    fetchPhotos();
  }, [topic]);

  return { photos, error };
};

export default usePhotos;