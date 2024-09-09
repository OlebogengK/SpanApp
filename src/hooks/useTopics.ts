// I created a custom hook called useTopics for fetching topics from the api via the controller
// the useState is for managing state of topics and set the topics
// the useEffect is used to fetch data when the component renders or the dependencies (page,perPage,orderBy) change

import { useState, useEffect } from 'react';
import TopicController from '../controller/topic/topic.controller';

const useTopics = (page = 1, perPage = 10, orderBy = 'featured') => {
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      // instatiate the controller
      const controller = new TopicController();
      try {
        const data = await controller.fetchTopics(page, perPage, orderBy);
        setTopics(data);
      } catch (err) {
        setError('Failed to fetch topics.');
        console.error(err);
      }
    };

    fetchTopics();
  }, [page, perPage, orderBy]);

  return { topics, error };
};

export default useTopics;