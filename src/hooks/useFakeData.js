import { useState, useEffect } from 'react';

export const IDLE_STATUS = 'idle';
export const FETCHING_STATUS = 'fetching';
export const FINISHED_STATUS = 'finished';

const useFakeData = () => {
  const [status, setStatus] = useState(IDLE_STATUS);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query.length === 0) return;

    const fetchFakeData = async () => {
      setStatus(FETCHING_STATUS);
      const response = await fetch('users.json');
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.users.filter(
          result =>
            result.username.toLowerCase().includes(query) ||
            result.name.toLowerCase().includes(query)
        );
        setData(filteredData);
      } else {
        setError('Bad response from server');
      }

      setStatus(FINISHED_STATUS);
    };

    fetchFakeData();
  }, [query]);

  return {
    status,
    setQuery,
    data,
    error
  };
};

export default useFakeData;
